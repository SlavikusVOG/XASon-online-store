import { inject } from '@angular/core';
import { ApiService, getBasicAuthHeader } from '@core/http';
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
  withMethods((store, apiService = inject(ApiService)) => ({
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
                Authorization: getBasicAuthHeader(),
                'Content-Type': 'application/json',
              },
            })
            .pipe(
              tapResponse({
                next: (res) => {
                  const products = processDtoData(res.results);
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
      patchState(store, (state) => {
        const products = state.products.map((e) =>
          e.id === product.id ? { ...e, isInCart: true } : e,
        );

        return { products };
      });
    },
    removeFromCart(product: Product): void {
      patchState(store, (state) => {
        const products = state.products.map((e) =>
          e.id === product.id ? { ...e, isInCart: false } : e,
        );

        return { products };
      });
    },
  })),
);

function processDtoData(productsDto: ProductDto[]): Product[] {
  return productsDto.map(
    (item) =>
      ({
        id: item.id,
        name: item.masterData.current.name,
        image: item.masterData.current.variants.images[0],
        description: '',
        isInCart: false,
      }) as unknown as Product,
  );
}
