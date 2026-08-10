import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ApiService } from '@core/http';
import { CartModel, LineItem, TypedMoney } from '@models/features/cart';
import { DATA_LOAD_STATUSES } from '@shared/const';
import { of, Subject, throwError } from 'rxjs';
import { CartStore } from './cart.store';

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
    quantity: 1,
    price: { id: 'price-1', value: createMoney(500) },
    totalPrice: createMoney(500),
    variant: {
      id: 1,
      images: [{ url: 'https://example.com/item.jpg' }],
    },
    ...overrides,
  };
}

function createCart(overrides: Partial<CartModel> = {}): CartModel {
  return {
    id: 'cart-1',
    version: 1,
    lineItems: [createLineItem()],
    totalPrice: createMoney(500),
    ...overrides,
  };
}

describe('CartStore', () => {
  let store: InstanceType<typeof CartStore>;
  let getActiveCart: ReturnType<typeof vi.fn>;
  let createCartApi: ReturnType<typeof vi.fn>;
  let updateCart: ReturnType<typeof vi.fn>;
  let deleteCart: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getActiveCart = vi.fn();
    createCartApi = vi.fn();
    updateCart = vi.fn();
    deleteCart = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        CartStore,
        {
          provide: ApiService,
          useValue: {
            getActiveCart,
            createCart: createCartApi,
            updateCart,
            deleteCart,
          },
        },
      ],
    });

    store = TestBed.inject(CartStore);
  });

  it('should start with null cart and INIT status', () => {
    expect(store.cart()).toBeNull();
    expect(store.loadStatus()).toBe(DATA_LOAD_STATUSES.INIT);
    expect(store.mutating()).toBe(false);
  });

  it('should load active cart and set WITH_DATA on success', async () => {
    getActiveCart.mockReturnValue(of(createCart()));

    store.loadActiveCart();

    await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.WITH_DATA);

    expect(getActiveCart).toHaveBeenCalled();
    expect(store.cart()?.id).toBe('cart-1');
    expect(store.cart()?.lineItems).toHaveLength(1);
  });

  it('should set NO_DATA when active cart has no line items', async () => {
    getActiveCart.mockReturnValue(of(createCart({ lineItems: [], totalPrice: createMoney(0) })));

    store.loadActiveCart();

    await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.NO_DATA);
    expect(store.cart()?.lineItems).toEqual([]);
  });

  it('should create a cart when active cart returns 404', async () => {
    getActiveCart.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' })),
    );
    createCartApi.mockReturnValue(of(createCart({ lineItems: [] })));

    store.loadActiveCart();

    await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.NO_DATA);

    expect(createCartApi).toHaveBeenCalledWith({
      body: { currency: 'USD' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(store.cart()?.id).toBe('cart-1');
  });

  it('should set ERROR when API fails with non-404', async () => {
    getActiveCart.mockReturnValue(throwError(() => new Error('Network error')));

    store.loadActiveCart();

    await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.ERROR);
    expect(store.cart()).toBeNull();
  });

  it('should set LOADING while request is in flight', () => {
    const response$ = new Subject<CartModel>();
    getActiveCart.mockReturnValue(response$.asObservable());

    store.loadActiveCart();

    expect(store.loadStatus()).toBe(DATA_LOAD_STATUSES.LOADING);

    response$.next(createCart());
    response$.complete();
  });

  describe('changeLineItemQuantity', () => {
    beforeEach(async () => {
      getActiveCart.mockReturnValue(of(createCart()));
      store.loadActiveCart();
      await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.WITH_DATA);
    });

    it('should update cart with changeLineItemQuantity action', async () => {
      const updated = createCart({
        version: 2,
        lineItems: [createLineItem({ quantity: 3, totalPrice: createMoney(1500) })],
        totalPrice: createMoney(1500),
      });
      updateCart.mockReturnValue(of(updated));

      store.changeLineItemQuantity({ lineItemId: 'li-1', quantity: 3 });

      await vi.waitFor(() => store.cart()?.version === 2);

      expect(updateCart).toHaveBeenCalledWith({
        params: { id: 'cart-1' },
        body: {
          version: 1,
          actions: [{ action: 'changeLineItemQuantity', lineItemId: 'li-1', quantity: 3 }],
        },
        headers: { 'Content-Type': 'application/json' },
      });
      expect(store.cart()?.lineItems[0].quantity).toBe(3);
      expect(store.mutating()).toBe(false);
    });
  });

  describe('removeLineItem', () => {
    beforeEach(async () => {
      getActiveCart.mockReturnValue(of(createCart()));
      store.loadActiveCart();
      await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.WITH_DATA);
    });

    it('should update cart with removeLineItem action', async () => {
      updateCart.mockReturnValue(of(createCart({ version: 2, lineItems: [] })));

      store.removeLineItem('li-1');

      await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.NO_DATA);

      expect(updateCart).toHaveBeenCalledWith({
        params: { id: 'cart-1' },
        body: {
          version: 1,
          actions: [{ action: 'removeLineItem', lineItemId: 'li-1' }],
        },
        headers: { 'Content-Type': 'application/json' },
      });
    });
  });

  describe('clearCart', () => {
    beforeEach(async () => {
      getActiveCart.mockReturnValue(of(createCart()));
      store.loadActiveCart();
      await vi.waitFor(() => store.loadStatus() === DATA_LOAD_STATUSES.WITH_DATA);
    });

    it('should delete cart then create a new empty cart', async () => {
      deleteCart.mockReturnValue(of(createCart()));
      createCartApi.mockReturnValue(of(createCart({ id: 'cart-2', version: 1, lineItems: [] })));

      store.clearCart();

      await vi.waitFor(() => store.cart()?.id === 'cart-2');

      expect(deleteCart).toHaveBeenCalledWith({
        params: { id: 'cart-1' },
        queries: { version: 1 },
      });
      expect(createCartApi).toHaveBeenCalled();
      expect(store.loadStatus()).toBe(DATA_LOAD_STATUSES.NO_DATA);
    });
  });
});
