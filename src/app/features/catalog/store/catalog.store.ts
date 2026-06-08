import { inject } from '@angular/core';
import { ApiService } from '@core/http';
import { Product } from '@models/features/catalog';
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
          apiService.getCatalogProducts().pipe(
            tapResponse({
              next: (res) => {
                patchState(store, {
                  products: res,
                  loadStatus: res.length
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
