import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartModel, LineItem, TypedMoney } from '@models/features/cart';
import { Cart } from './cart';

function createMoney(centAmount = 1000): TypedMoney {
  return {
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount,
    fractionDigits: 2,
  };
}

function createLineItem(overrides: Partial<LineItem> = {}): LineItem {
  return {
    id: 'li-1',
    productId: 'prod-1',
    name: { 'en-US': 'Test Item' },
    quantity: 2,
    price: { id: 'price-1', value: createMoney(500) },
    totalPrice: createMoney(1000),
    variant: { id: 1, images: [{ url: 'https://example.com/item.jpg' }] },
    ...overrides,
  };
}

function createCart(overrides: Partial<CartModel> = {}): CartModel {
  return {
    id: 'cart-1',
    version: 1,
    lineItems: [createLineItem()],
    totalPrice: createMoney(1000),
    ...overrides,
  };
}

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cart],
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cart', createCart());
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit clearCart', () => {
    const spy = vi.fn();
    component.clearCart.subscribe(spy);

    component['onClearCart']();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit quantityChange and removeItem', () => {
    const quantitySpy = vi.fn();
    const removeSpy = vi.fn();
    component.quantityChange.subscribe(quantitySpy);
    component.removeItem.subscribe(removeSpy);

    component['onQuantityChange']({ lineItemId: 'li-1', quantity: 3 });
    component['onRemoveItem']('li-1');

    expect(quantitySpy).toHaveBeenCalledWith({ lineItemId: 'li-1', quantity: 3 });
    expect(removeSpy).toHaveBeenCalledWith('li-1');
  });
});
