import { TestBed } from '@angular/core/testing';
import { LocalStorage } from '@core/local-storage';
import { environment } from '@environments/environment';
import { CartModel, FALLBACK_MONEY, LineItem } from '@models/features/cart';
import { Product } from '@models/features/catalog';
import { CartStore } from './cart.store';

const mockPrice = {
  ...FALLBACK_MONEY,
  centAmount: 1000,
};

const mockProduct: Product = {
  id: 'prod-1',
  name: 'Portal Gun',
  image: 'portal.jpg',
  description: 'Aperture science',
  isInCart: false,
  productKey: 'portal-gun',
  price: mockPrice,
};

function createLineItem(overrides: Partial<LineItem> = {}): LineItem {
  return {
    id: 'prod-1',
    productId: 'prod-1',
    productKey: 'portal-gun',
    name: 'Portal Gun',
    image: 'portal.jpg',
    quantity: 1,
    price: {
      id: 'prod-1',
      key: 'portal-gun',
      value: mockPrice,
    },
    ...overrides,
  };
}

describe('CartStore', () => {
  let store: InstanceType<typeof CartStore>;
  let getValue: ReturnType<typeof vi.fn>;
  let setValue: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getValue = vi.fn().mockReturnValue(null);
    setValue = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        CartStore,
        {
          provide: LocalStorage,
          useValue: { getValue, setValue },
        },
      ],
    });

    store = TestBed.inject(CartStore);
  });

  it('should start empty', () => {
    expect(store.lineItems()).toEqual([]);
    expect(store.discountCode()).toBeNull();
    expect(store.isEmpty()).toBe(true);
    expect(store.itemCount()).toBe(0);
    expect(store.subtotal()).toBe(0);
    expect(store.total()).toBe(0);
  });

  it('should add a product as a new line item', () => {
    store.addProduct(mockProduct);

    expect(store.lineItems()).toHaveLength(1);
    expect(store.lineItems()[0]).toMatchObject({
      productId: 'prod-1',
      name: 'Portal Gun',
      quantity: 1,
    });
    expect(store.hasProduct('prod-1')).toBe(true);
    expect(store.isEmpty()).toBe(false);
    expect(store.itemCount()).toBe(1);
    expect(store.subtotal()).toBe(1000);
  });

  it('should increment quantity when adding an existing product', () => {
    store.addProduct(mockProduct);
    store.addProduct(mockProduct);

    expect(store.lineItems()).toHaveLength(1);
    expect(store.lineItems()[0].quantity).toBe(2);
    expect(store.itemCount()).toBe(2);
    expect(store.subtotal()).toBe(2000);
  });

  it('should remove a product line', () => {
    store.addProduct(mockProduct);
    store.removeProduct('prod-1');

    expect(store.lineItems()).toEqual([]);
    expect(store.hasProduct('prod-1')).toBe(false);
    expect(store.isEmpty()).toBe(true);
  });

  it('should clamp quantity to at least 1', () => {
    store.addProduct(mockProduct);
    store.changeQuantity('prod-1', 4);
    expect(store.lineItems()[0].quantity).toBe(4);

    store.changeQuantity('prod-1', 0);
    expect(store.lineItems()[0].quantity).toBe(1);

    store.changeQuantity('prod-1', -3);
    expect(store.lineItems()[0].quantity).toBe(1);
  });

  it('should clear items and promo code', () => {
    store.addProduct(mockProduct);
    store.applyPromoCode('WELCOME10');
    store.clear();

    expect(store.lineItems()).toEqual([]);
    expect(store.discountCode()).toBeNull();
    expect(store.total()).toBe(0);
  });

  it('should apply a valid promo code and discount the total', () => {
    store.addProduct(mockProduct);
    store.addProduct(mockProduct);

    const applied = store.applyPromoCode('welcome10');

    expect(applied).toBe(true);
    expect(store.discountCode()).toBe('WELCOME10');
    expect(store.subtotal()).toBe(2000);
    expect(store.discountAmount()).toBe(200);
    expect(store.total()).toBe(1800);
  });

  it('should reject an invalid promo code', () => {
    store.addProduct(mockProduct);

    const applied = store.applyPromoCode('NOT-A-CODE');

    expect(applied).toBe(false);
    expect(store.discountCode()).toBeNull();
    expect(store.discountAmount()).toBe(0);
    expect(store.total()).toBe(1000);
  });

  it('should remove an applied promo code', () => {
    store.addProduct(mockProduct);
    store.applyPromoCode('ARTIFACT20');
    store.removePromoCode();

    expect(store.discountCode()).toBeNull();
    expect(store.discountAmount()).toBe(0);
    expect(store.total()).toBe(1000);
  });

  it('should persist cart changes to localStorage', async () => {
    store.addProduct(mockProduct);

    await vi.waitFor(() => expect(setValue).toHaveBeenCalled());

    expect(setValue).toHaveBeenCalledWith(environment.LOCAL_STORAGE_KEYS.cart, {
      lineItems: store.lineItems(),
      discountCode: null,
    });
  });
});

describe('CartStore hydration', () => {
  it('should hydrate line items from localStorage', () => {
    const persisted: CartModel = {
      lineItems: [createLineItem({ quantity: 3 })],
      discountCode: 'WELCOME10',
    };

    TestBed.configureTestingModule({
      providers: [
        CartStore,
        {
          provide: LocalStorage,
          useValue: {
            getValue: vi.fn().mockReturnValue(persisted),
            setValue: vi.fn(),
          },
        },
      ],
    });

    const store = TestBed.inject(CartStore);

    expect(store.lineItems()).toHaveLength(1);
    expect(store.lineItems()[0].quantity).toBe(3);
    expect(store.discountCode()).toBe('WELCOME10');
    expect(store.itemCount()).toBe(3);
    expect(store.discountAmount()).toBe(300);
    expect(store.total()).toBe(2700);
  });

  it('should drop a persisted promo code that is no longer valid', () => {
    const persisted: CartModel = {
      lineItems: [createLineItem({ quantity: 3 })],
      discountCode: 'EXPIRED50',
    };

    TestBed.configureTestingModule({
      providers: [
        CartStore,
        {
          provide: LocalStorage,
          useValue: {
            getValue: vi.fn().mockReturnValue(persisted),
            setValue: vi.fn(),
          },
        },
      ],
    });

    const store = TestBed.inject(CartStore);

    expect(store.discountCode()).toBeNull();
    expect(store.discountAmount()).toBe(0);
    expect(store.total()).toBe(3000);
  });

  it('should normalize a persisted valid promo code', () => {
    const persisted: CartModel = {
      lineItems: [createLineItem({ quantity: 1 })],
      discountCode: '  welcome10  ',
    };

    TestBed.configureTestingModule({
      providers: [
        CartStore,
        {
          provide: LocalStorage,
          useValue: {
            getValue: vi.fn().mockReturnValue(persisted),
            setValue: vi.fn(),
          },
        },
      ],
    });

    const store = TestBed.inject(CartStore);

    expect(store.discountCode()).toBe('WELCOME10');
    expect(store.discountAmount()).toBe(100);
  });
});
