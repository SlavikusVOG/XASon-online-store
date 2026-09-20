import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FALLBACK_MONEY, LineItem } from '@models/features/cart';
import { provideTaiga } from '@taiga-ui/core';
import { Cart } from './cart';

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
  quantity: 2,
  price: {
    id: 'prod-1',
    key: 'portal-gun',
    value: { ...FALLBACK_MONEY, centAmount: 1000 },
  },
};

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;

  beforeEach(async () => {
    mockMatchMedia();

    await TestBed.configureTestingModule({
      imports: [Cart],
      providers: [provideTaiga()],
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('lineItems', [mockItem]);
    fixture.componentRef.setInput('subtotal', 2000);
    fixture.componentRef.setInput('discountAmount', 0);
    fixture.componentRef.setInput('total', 2000);
    fixture.componentRef.setInput('discountCode', null);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render line items and subtotal', () => {
    expect(fixture.nativeElement.textContent).toContain('Portal Gun');
    expect(fixture.nativeElement.textContent).toContain('Subtotal');
    expect(fixture.nativeElement.querySelectorAll('xas-cart-item').length).toBe(1);
  });

  it('should show original and discounted totals when a promo is applied', () => {
    fixture.componentRef.setInput('discountAmount', 200);
    fixture.componentRef.setInput('total', 1800);
    fixture.componentRef.setInput('discountCode', 'WELCOME10');
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('WELCOME10');
    expect(fixture.nativeElement.querySelector('.cart__original-total')).toBeTruthy();
  });

  it('should emit promoApplied with the entered code', () => {
    const spy = vi.fn();
    component.promoApplied.subscribe(spy);

    const input = fixture.nativeElement.querySelector('#cart-promo-code') as HTMLInputElement;
    input.value = 'WELCOME10';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const apply = Array.from(fixture.nativeElement.querySelectorAll('button')).find((button) =>
      (button as HTMLButtonElement).textContent?.includes('Apply'),
    ) as HTMLButtonElement;
    apply.click();

    expect(spy).toHaveBeenCalledWith('WELCOME10');
  });

  it('should emit cleared when clear is clicked', () => {
    const spy = vi.fn();
    component.cleared.subscribe(spy);

    const clear = Array.from(fixture.nativeElement.querySelectorAll('button')).find((button) =>
      (button as HTMLButtonElement).textContent?.includes('Clear shopping cart'),
    ) as HTMLButtonElement;
    clear.click();

    expect(spy).toHaveBeenCalled();
  });
});
