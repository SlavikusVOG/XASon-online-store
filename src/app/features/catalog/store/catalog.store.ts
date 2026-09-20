import { inject } from '@angular/core';
import { ApiService } from '@core/http';
import { CartStore } from '@features/cart/store';
import { FALLBACK_MONEY } from '@models/features/cart';
import { Product, ProductDto } from '@models/features/catalog';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { DATA_LOAD_STATUSES, DataLoadStatus } from '@shared/const';
import { pipe, switchMap, tap } from 'rxjs';

type CatalogState = {
  products: Product[];
  loadStatus: DataLoadStatus;
};

const initialState: CatalogState = {
  products: [],
  loadStatus: DATA_LOAD_STATUSES.INIT,
};

export const CatalogStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(ApiService), cartStore = inject(CartStore)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadStatus: DATA_LOAD_STATUSES.LOADING })),
        switchMap(() =>
          apiService
            .getCatalogProducts({
              params: {
                limit: 10,
                offset: 0,
              },
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .pipe(
              tapResponse({
                next: (res) => {
                  const products = processDtoData(res.results, cartStore.productIds());
                  patchState(store, {
                    products,
                    loadStatus: products.length
                      ? DATA_LOAD_STATUSES.WITH_DATA
                      : DATA_LOAD_STATUSES.NO_DATA,
                  });
                },
                error: () => {
                  patchState(store, { loadStatus: DATA_LOAD_STATUSES.ERROR });
                },
              }),
            ),
        ),
      ),
    ),
    addToCart(product: Product): void {
      cartStore.addProduct(product);
      patchState(store, (state) => ({
        products: state.products.map((item) =>
          item.id === product.id ? { ...item, isInCart: true } : item,
        ),
      }));
    },
    removeFromCart(product: Product): void {
      cartStore.removeProduct(product.id);
      patchState(store, (state) => ({
        products: state.products.map((item) =>
          item.id === product.id ? { ...item, isInCart: false } : item,
        ),
      }));
    },
  })),
);

function processDtoData(productsDto: ProductDto[], cartProductIds: Set<string>): Product[] {
  return productsDto.map((item) => ({
    id: item.id,
    name: item.name['en-US'],
    image: item.masterVariant.images[0]?.url ?? '',
    description: item.description['en-US'],
    isInCart: cartProductIds.has(item.id),
    productKey: item.key,
    price: item.masterVariant.prices[0]?.value ?? FALLBACK_MONEY,
  }));
}
