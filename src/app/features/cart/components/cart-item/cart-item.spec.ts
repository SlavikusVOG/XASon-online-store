import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineItem, TypedMoney } from '@models/features/cart';
import { CartItem } from './cart-item';

function createMoney(centAmount = 500): TypedMoney {
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

describe('CartItem', () => {
  let component: CartItem;
  let fixture: ComponentFixture<CartItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', createLineItem());
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit increased quantity', () => {
    const spy = vi.fn();
    component.quantityChange.subscribe(spy);

    component['increaseQuantity']();

    expect(spy).toHaveBeenCalledWith({ lineItemId: 'li-1', quantity: 3 });
  });

  it('should emit decreased quantity when quantity is greater than 1', () => {
    const spy = vi.fn();
    component.quantityChange.subscribe(spy);

    component['decreaseQuantity']();

    expect(spy).toHaveBeenCalledWith({ lineItemId: 'li-1', quantity: 1 });
  });

  it('should emit remove when decreasing quantity at 1', () => {
    fixture.componentRef.setInput('item', createLineItem({ quantity: 1 }));
    fixture.detectChanges();

    const removeSpy = vi.fn();
    component.removeItem.subscribe(removeSpy);

    component['decreaseQuantity']();

    expect(removeSpy).toHaveBeenCalledWith('li-1');
  });

  it('should emit remove on remove click', () => {
    const spy = vi.fn();
    component.removeItem.subscribe(spy);

    component['onRemove']();

    expect(spy).toHaveBeenCalledWith('li-1');
  });
});
