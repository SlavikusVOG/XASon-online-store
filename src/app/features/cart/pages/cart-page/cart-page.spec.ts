import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CartStore } from '@features/cart/store';
import { FALLBACK_MONEY, LineItem } from '@models/features/cart';
import { ToastService } from '@shared/services';
import { provideTaiga } from '@taiga-ui/core';
import { CartPage } from './cart-page';

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

const mockItem: LineItem = {
  id: 'prod-1',
  productId: 'prod-1',
  name: 'Portal Gun',
  image: '',
  quantity: 1,
  price: {
    id: 'prod-1',
    key: 'portal-gun',
    value: { ...FALLBACK_MONEY, centAmount: 1000 },
  },
};

function createMockCartStore() {
  return {
    lineItems: signal<LineItem[]>([]),
    isEmpty: signal(true),
    subtotal: signal(0),
    discountAmount: signal(0),
    total: signal(0),
    discountCode: signal<string | null>(null),
    changeQuantity: vi.fn(),
    removeProduct: vi.fn(),
    clear: vi.fn(),
    applyPromoCode: vi.fn(),
    removePromoCode: vi.fn(),
  };
}

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let cartStore: ReturnType<typeof createMockCartStore>;
  let toastService: {
    showSuccessToast: ReturnType<typeof vi.fn>;
    showErrorToast: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockMatchMedia();
    cartStore = createMockCartStore();
    toastService = {
      showSuccessToast: vi.fn(),
      showErrorToast: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [
        provideRouter([]),
        provideTaiga(),
        { provide: CartStore, useValue: cartStore },
        { provide: ToastService, useValue: toastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an empty state with a catalog link', () => {
    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Your cart is empty');
    const link = el.querySelector('a');
    expect(link?.getAttribute('href')).toBe('/catalog');
    expect(link?.textContent).toContain('Continue shopping');
  });

  it('should render cart items when the cart is not empty', () => {
    cartStore.lineItems.set([mockItem]);
    cartStore.isEmpty.set(false);
    cartStore.subtotal.set(1000);
    cartStore.total.set(1000);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('xas-cart')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Portal Gun');
    expect(fixture.nativeElement.textContent).not.toContain('Your cart is empty');
  });

  it('should show a success toast when a promo code is applied', () => {
    cartStore.applyPromoCode.mockReturnValue(true);

    component.onPromoApplied('WELCOME10');

    expect(cartStore.applyPromoCode).toHaveBeenCalledWith('WELCOME10');
    expect(toastService.showSuccessToast).toHaveBeenCalledWith('Promo code applied');
    expect(toastService.showErrorToast).not.toHaveBeenCalled();
  });

  it('should show an error toast when a promo code is invalid', () => {
    cartStore.applyPromoCode.mockReturnValue(false);

    component.onPromoApplied('NOPE');

    expect(toastService.showErrorToast).toHaveBeenCalledWith('Invalid promo code');
    expect(toastService.showSuccessToast).not.toHaveBeenCalled();
  });
});
