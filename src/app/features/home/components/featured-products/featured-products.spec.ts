import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CatalogStore } from '@features/catalog/store';
import { Product } from '@models/features/catalog';
import { DATA_LOAD_STATUSES, DataLoadStatus } from '@shared/const';
import { provideTaiga } from '@taiga-ui/core';
import { FeaturedProducts } from './featured-products';

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

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  image: 'test.jpg',
  description: 'A test product',
  isInCart: false,
};

describe('FeaturedProducts', () => {
  let component: FeaturedProducts;
  let fixture: ComponentFixture<FeaturedProducts>;
  let store: ReturnType<typeof createMockStore>;

  beforeEach(async () => {
    mockMatchMedia();
    store = createMockStore();

    await TestBed.configureTestingModule({
      imports: [FeaturedProducts],
      providers: [provideRouter([]), { provide: CatalogStore, useValue: store }, provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section title', () => {
    expect(fixture.nativeElement.textContent).toContain('Featured Products');
  });

  it('should render "View All" link', () => {
    const el = fixture.nativeElement as HTMLElement;
    const viewAll = el.querySelector('.featured__view-all');
    expect(viewAll).toBeTruthy();
    expect(viewAll?.textContent).toContain('View All');
    expect(viewAll?.getAttribute('href')).toBe('/catalog');
  });

  describe('load status states', () => {
    it('should render skeletons while loading', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.LOADING);
      fixture.detectChanges();

      const grid = fixture.nativeElement.querySelector('.featured__grid');
      expect(grid?.getAttribute('aria-busy')).toBe('true');
      expect(grid?.getAttribute('aria-live')).toBe('polite');
      expect(fixture.nativeElement.querySelectorAll('xas-product-card-skeleton').length).toBe(4);
    });

    it('should render up to 4 product cards when data is loaded', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.WITH_DATA);
      store.products.set([
        { id: '1', name: 'A', image: 'a.jpg', description: 'Desc A', isInCart: false },
        { id: '2', name: 'B', image: 'b.jpg', description: 'Desc B', isInCart: false },
        { id: '3', name: 'C', image: 'c.jpg', description: 'Desc C', isInCart: false },
        { id: '4', name: 'D', image: 'd.jpg', description: 'Desc D', isInCart: false },
        { id: '5', name: 'E', image: 'e.jpg', description: 'Desc E', isInCart: false },
      ]);
      fixture.detectChanges();

      const cards = fixture.nativeElement.querySelectorAll('xas-product-card');
      expect(cards.length).toBe(4);
    });

    it('should render product cards only up to featuredProductsCount', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.WITH_DATA);
      store.products.set([
        { id: '1', name: 'A', image: 'a.jpg', description: 'Desc A', isInCart: false },
        { id: '2', name: 'B', image: 'b.jpg', description: 'Desc B', isInCart: false },
      ]);
      fixture.detectChanges();

      const cards = fixture.nativeElement.querySelectorAll('xas-product-card');
      expect(cards.length).toBe(2);
    });

    it('should render empty placeholder when no data', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.NO_DATA);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Nothing found');
      expect(fixture.nativeElement.querySelector('xas-data-placeholder')).toBeTruthy();
    });

    it('should render error placeholder on error', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.ERROR);
      fixture.detectChanges();

      expect(fixture.nativeElement.textContent).toContain('Error occured. Retry later');
      expect(fixture.nativeElement.querySelector('xas-data-placeholder')).toBeTruthy();
    });

    it('should retry loading from placeholder', () => {
      store.loadStatus.set(DATA_LOAD_STATUSES.ERROR);
      fixture.detectChanges();

      component.retryLoad();

      expect(store.loadProducts).toHaveBeenCalledTimes(1);
    });

    it('should not render product cards or skeletons in INIT status', () => {
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelectorAll('xas-product-card').length).toBe(0);
      expect(fixture.nativeElement.querySelectorAll('xas-product-card-skeleton').length).toBe(0);
    });
  });

  describe('addToCart / removeFromCart', () => {
    beforeEach(() => {
      store.loadStatus.set(DATA_LOAD_STATUSES.WITH_DATA);
      store.products.set([mockProduct]);
      fixture.detectChanges();
    });

    it('should delegate addToCart to store', () => {
      component.addToCart(mockProduct);

      expect(store.addToCart).toHaveBeenCalledWith(mockProduct);
    });

    it('should delegate removeFromCart to store', () => {
      component.removeFromCart(mockProduct);

      expect(store.removeFromCart).toHaveBeenCalledWith(mockProduct);
    });
  });
});
