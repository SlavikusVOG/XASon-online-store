import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CatalogStore } from '@features/catalog/store';
import { Product } from '@models/features/catalog';
import { DATA_LOAD_STATUSES, DataLoadStatus } from '@shared/const';
import { provideTaiga } from '@taiga-ui/core';
import { HomePage } from './home-page';

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

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let store: ReturnType<typeof createMockStore>;

  beforeEach(async () => {
    mockMatchMedia();
    store = createMockStore();

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([]), { provide: CatalogStore, useValue: store }, provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    fixture.detectChanges();

    expect(store.loadProducts).toHaveBeenCalledTimes(1);
  });

  it('should expose banners from mock data', () => {
    fixture.detectChanges();

    expect(component.banners.length).toBeGreaterThan(0);
    expect(component.banners[0].title).toBe('Summer Sale!');
  });

  it('should expose categories from mock data', () => {
    fixture.detectChanges();

    expect(component.categories.length).toBeGreaterThan(0);
    expect(component.categories[0].name).toBe('Rick & Morty');
  });

  it('should expose promo codes from mock data', () => {
    fixture.detectChanges();

    expect(component.promoCodes.length).toBeGreaterThan(0);
    expect(component.promoCodes[0].code).toBe('WELCOME10');
  });

  it('should render all child components', () => {
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('xas-promo-banner')).toBeTruthy();
    expect(el.querySelector('xas-category-nav')).toBeTruthy();
    expect(el.querySelector('xas-featured-products')).toBeTruthy();
    expect(el.querySelector('xas-promo-codes-display')).toBeTruthy();
  });
});
