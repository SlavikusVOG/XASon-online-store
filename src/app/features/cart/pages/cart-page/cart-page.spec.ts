import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartStore } from '@features/cart/store';
import { CartModel, LineItem, TypedMoney } from '@models/features/cart';
import { DATA_LOAD_STATUSES, DataLoadStatus } from '@shared/const';
import { CartPage } from './cart-page';

function createMoney(centAmount = 1000): TypedMoney {
  return {
    type: 'centPrecision',
    currencyCode: 'USD',
    centAmount,
    fractionDigits: 2,
  };
}

function createLineItem(): LineItem {
  return {
    id: 'li-1',
    productId: 'prod-1',
    name: { 'en-US': 'Test Item' },
    quantity: 2,
    price: { id: 'price-1', value: createMoney(500) },
    totalPrice: createMoney(1000),
    variant: { id: 1, images: [{ url: 'https://example.com/item.jpg' }] },
  };
}

function createCart(): CartModel {
  return {
    id: 'cart-1',
    version: 1,
    lineItems: [createLineItem()],
    totalPrice: createMoney(1000),
  };
}

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let store: {
    cart: ReturnType<typeof signal<CartModel | null>>;
    loadStatus: ReturnType<typeof signal<DataLoadStatus>>;
    mutating: ReturnType<typeof signal<boolean>>;
    loadActiveCart: ReturnType<typeof vi.fn>;
    changeLineItemQuantity: ReturnType<typeof vi.fn>;
    removeLineItem: ReturnType<typeof vi.fn>;
    clearCart: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    store = {
      cart: signal<CartModel | null>(createCart()),
      loadStatus: signal<DataLoadStatus>(DATA_LOAD_STATUSES.WITH_DATA),
      mutating: signal(false),
      loadActiveCart: vi.fn(),
      changeLineItemQuantity: vi.fn(),
      removeLineItem: vi.fn(),
      clearCart: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [{ provide: CartStore, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load active cart on init', () => {
    expect(store.loadActiveCart).toHaveBeenCalled();
  });

  it('should delegate quantity change to store', () => {
    component.onQuantityChange({ lineItemId: 'li-1', quantity: 3 });
    expect(store.changeLineItemQuantity).toHaveBeenCalledWith({
      lineItemId: 'li-1',
      quantity: 3,
    });
  });

  it('should delegate remove to store', () => {
    component.onRemoveItem('li-1');
    expect(store.removeLineItem).toHaveBeenCalledWith('li-1');
  });

  it('should delegate clear to store', () => {
    component.onClearCart();
    expect(store.clearCart).toHaveBeenCalled();
  });

  it('should retry load', () => {
    component.retryLoad();
    expect(store.loadActiveCart).toHaveBeenCalledTimes(2);
  });
});
