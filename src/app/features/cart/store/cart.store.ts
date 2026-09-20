import { computed, effect, inject } from '@angular/core';
import { LocalStorage } from '@core/local-storage';
import { environment } from '@environments/environment';
import { PROMO_RATES, resolvePromoCode } from '@features/cart/const/promo-rates.const';
import { CartModel, LineItem } from '@models/features/cart';
import { Product } from '@models/features/catalog';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const initialState: CartModel = {
  lineItems: [],
  discountCode: null,
};

function toLineItem(product: Product): LineItem {
  return {
    id: product.id,
    productId: product.id,
    productKey: product.productKey,
    name: product.name,
    image: product.image,
    quantity: 1,
    price: {
      id: product.id,
      key: product.productKey ?? product.id,
      value: product.price,
    },
  };
}

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => {
    const subtotal = computed(() =>
      store.lineItems().reduce((acc, item) => acc + item.price.value.centAmount * item.quantity, 0),
    );
    const discountAmount = computed(() => {
      const code = store.discountCode();
      if (!code) {
        return 0;
      }

      const rate = PROMO_RATES.get(code) ?? 0;
      return Math.round(subtotal() * rate);
    });

    return {
      itemCount: computed(() => store.lineItems().reduce((acc, item) => acc + item.quantity, 0)),
      isEmpty: computed(() => store.lineItems().length === 0),
      productIds: computed(() => new Set(store.lineItems().map((item) => item.productId))),
      subtotal,
      discountAmount,
      total: computed(() => subtotal() - discountAmount()),
    };
  }),
  withMethods((store) => ({
    hasProduct(productId: string): boolean {
      return store.productIds().has(productId);
    },
    addProduct(product: Product): void {
      const existing = store.lineItems().find((item) => item.productId === product.id);
      if (existing) {
        patchState(store, {
          lineItems: store
            .lineItems()
            .map((item) =>
              item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
        });
        return;
      }

      patchState(store, {
        lineItems: [...store.lineItems(), toLineItem(product)],
      });
    },
    removeProduct(productId: string): void {
      const lineItems = store.lineItems().filter((item) => item.productId !== productId);
      patchState(store, {
        lineItems,
        discountCode: lineItems.length ? store.discountCode() : null,
      });
    },
    changeQuantity(lineItemId: string, quantity: number): void {
      const nextQuantity = Math.max(1, Math.floor(quantity));
      patchState(store, {
        lineItems: store
          .lineItems()
          .map((item) => (item.id === lineItemId ? { ...item, quantity: nextQuantity } : item)),
      });
    },
    clear(): void {
      patchState(store, initialState);
    },
    applyPromoCode(code: string): boolean {
      const normalized = resolvePromoCode(code);
      if (!normalized) {
        return false;
      }

      patchState(store, { discountCode: normalized });
      return true;
    },
    removePromoCode(): void {
      patchState(store, { discountCode: null });
    },
  })),
  withHooks({
    onInit(store) {
      const localStorage = inject(LocalStorage);
      const persisted = localStorage.getValue<CartModel>(environment.LOCAL_STORAGE_KEYS.cart);
      if (persisted && Array.isArray(persisted.lineItems)) {
        patchState(store, {
          lineItems: persisted.lineItems,
          discountCode: resolvePromoCode(persisted.discountCode),
        });
      }

      effect(() => {
        localStorage.setValue(environment.LOCAL_STORAGE_KEYS.cart, {
          lineItems: store.lineItems(),
          discountCode: store.discountCode(),
        });
      });
    },
  }),
);
