import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogStore } from '@features/catalog/store';
import { Product } from '@models/features/catalog';
import { DATA_LOAD_STATUSES, DataLoadStatus } from '@shared/const';
import { provideTaiga } from '@taiga-ui/core';
import { Catalog } from './catalog';

function mockMatchMedia(): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function createMockStore() {
  return {
    products: signal<Product[]>([]),
    loadStatus: signal<DataLoadStatus>(DATA_LOAD_STATUSES.INIT),
    loadProducts: vi.fn(),
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
  };
}

describe('Catalog', () => {
  let component: Catalog;
  let fixture: ComponentFixture<Catalog>;
  let store: ReturnType<typeof createMockStore>;

  beforeEach(async () => {
    mockMatchMedia();
    store = createMockStore();

    await TestBed.configureTestingModule({
      imports: [Catalog],
      providers: [{ provide: CatalogStore, useValue: store }, provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(Catalog);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    fixture.detectChanges();

    expect(store.loadProducts).toHaveBeenCalledTimes(1);
  });

  it('should delegate retryLoad to store', () => {
    component.retryLoad();

    expect(store.loadProducts).toHaveBeenCalledTimes(1);
  });

  it('should delegate addToCart to store', () => {
    const product = { id: '1', name: 'A', image: '', description: '', isInCart: false };

    component.addToCart(product);

    expect(store.addToCart).toHaveBeenCalledWith(product);
  });

  it('should delegate removeFromCart to store', () => {
    const product = { id: '1', name: 'A', image: '', description: '', isInCart: true };

    component.removeFromCart(product);

    expect(store.removeFromCart).toHaveBeenCalledWith(product);
  });

  describe('template', () => {
    it('should render skeletons while loading', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.LOADING);
      fixture.detectChanges();

      const grid = fixture.nativeElement.querySelector('.catalog__grid');
      expect(grid?.getAttribute('aria-busy')).toBe('true');
      expect(fixture.nativeElement.querySelectorAll('xas-product-card-skeleton').length).toBe(10);
    });

    it('should render product cards when data is loaded', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.WITH_DATA);
      store.products.set([
        { id: '1', name: 'A', image: 'a.jpg', description: 'Desc A', isInCart: false },
        { id: '2', name: 'B', image: 'b.jpg', description: 'Desc B', isInCart: false },
      ]);
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('xas-product-card').length).toBe(2);
    });

    it('should render empty placeholder when no data', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.NO_DATA);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Nothing found');
    });

    it('should render error placeholder on error', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.ERROR);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Error occured. Retry later');
    });

    it('should retry loading from placeholder', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.ERROR);
      fixture.detectChanges();

      const retryButton = fixture.nativeElement.querySelector('button');
      retryButton?.click();

      expect(store.loadProducts).toHaveBeenCalled();
    });
  });
});
