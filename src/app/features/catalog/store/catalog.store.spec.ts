import { TestBed } from '@angular/core/testing';
import { ApiService } from '@core/http';
import { ProductDto, ProductPagedQueryResponse } from '@models/features/catalog';
import { DATA_LOAD_STATUSES } from '@shared/const';
import { of, Subject, throwError } from 'rxjs';
import { CatalogStore } from './catalog.store';

function createProductDto(overrides: Partial<ProductDto> = {}): ProductDto {
  return {
    id: 'prod-1',
    version: 1,
    productType: { typeId: 'product-type', id: 'pt-1' },
    name: { 'en-US': 'Test Product' },
    description: { 'en-US': 'Test description' },
    categories: [],
    slug: { 'en-US': 'test-product' },
    masterVariant: {
      id: 1,
      sku: 'SKU-1',
      key: 'variant-1',
      prices: [],
      images: [{ url: 'https://example.com/image.jpg', dimensions: { w: 100, h: 100 } }],
      availability: { isOnStock: true, availableQuantity: 10, version: 1, id: 'avail-1' },
    },
    hasStagedChanges: false,
    published: true,
    key: 'test-product',
    taxCategory: { typeId: 'tax-category', id: 'tax-1' },
    createdAt: '2026-01-01',
    lastModifiedAt: '2026-01-01',
    ...overrides,
  };
}

describe('CatalogStore', () => {
  let store: InstanceType<typeof CatalogStore>;
  let getCatalogProducts: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getCatalogProducts = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        CatalogStore,
        {
          provide: ApiService,
          useValue: { getCatalogProducts },
        },
      ],
    });

    store = TestBed.inject(CatalogStore);
  });

  it('should start with empty products and INIT status', () => {
    expect(store.products()).toEqual([]);
    expect(store.loadStatus()).toBe(DATA_LOAD_STATUSES.INIT);
  });

  it('should load products and set WITH_DATA on success', async () => {
    getCatalogProducts.mockReturnValue(
      of({
        limit: 10,
        offset: 0,
        count: 1,
        total: 1,
        results: [createProductDto()],
      }),
    );

    store.loadProducts();

    await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.WITH_DATA);

    expect(getCatalogProducts).toHaveBeenCalledWith({
      params: { limit: 10, offset: 0 },
      headers: { 'Content-Type': 'application/json' },
    });

    expect(store.products()).toEqual([
      {
        id: 'prod-1',
        name: 'Test Product',
        image: 'https://example.com/image.jpg',
        description: 'Test description',
        isInCart: false,
      },
    ]);
  });

  it('should set NO_DATA when API returns empty results', async () => {
    getCatalogProducts.mockReturnValue(
      of({ limit: 10, offset: 0, count: 0, total: 0, results: [] }),
    );

    store.loadProducts();

    await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.NO_DATA);
    expect(store.products()).toEqual([]);
  });

  it('should set ERROR when API fails', async () => {
    getCatalogProducts.mockReturnValue(throwError(() => new Error('Network error')));

    store.loadProducts();

    await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.ERROR);
    expect(store.products()).toEqual([]);
  });

  it('should set LOADING while request is in flight', () => {
    const response$ = new Subject<ProductPagedQueryResponse>();
    getCatalogProducts.mockReturnValue(response$.asObservable());

    store.loadProducts();

    expect(store.loadStatus()).toBe(DATA_LOAD_STATUSES.LOADING);

    response$.next({ limit: 10, offset: 0, count: 0, total: 0, results: [] });
    response$.complete();
  });

  describe('addToCart', () => {
    beforeEach(async () => {
      getCatalogProducts.mockReturnValue(
        of({
          limit: 10,
          offset: 0,
          count: 2,
          total: 2,
          results: [
            createProductDto({ id: '1', name: { 'en-US': 'A' } }),
            createProductDto({ id: '2', name: { 'en-US': 'B' } }),
          ],
        }),
      );
      store.loadProducts();
      await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.WITH_DATA);
    });

    it('should mark only the selected product as in cart', () => {
      const product = store.products()[0];

      store.addToCart(product);

      expect(store.products()[0].isInCart).toBe(true);
      expect(store.products()[1].isInCart).toBe(false);
    });
  });

  describe('removeFromCart', () => {
    beforeEach(async () => {
      getCatalogProducts.mockReturnValue(
        of({
          limit: 10,
          offset: 0,
          count: 1,
          total: 1,
          results: [createProductDto()],
        }),
      );
      store.loadProducts();
      await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.WITH_DATA);
      store.addToCart(store.products()[0]);
    });

    it('should mark the product as not in cart', () => {
      store.removeFromCart(store.products()[0]);

      expect(store.products()[0].isInCart).toBe(false);
    });
  });
});
