import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { DataLoadStatus, dataLoadStatuses } from '../../../shared/const/data-load-statuses.const';
import { Product } from '../../../types/features/catalog/product.types';
import { inject } from '@angular/core';
import { ApiService } from '../../../core/http/api.service';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type CatalogState = {
  products: Product[];
  loadStatus: DataLoadStatus;
};

const initialState: CatalogState = {
  products: [],
  loadStatus: dataLoadStatuses.INIT,
};

export const CatalogStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(ApiService)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadStatus: dataLoadStatuses.LOADING })),
        switchMap(() =>
          apiService.getCatalogProducts().pipe(
            tapResponse({
              next: (res) => {
                patchState(store, {
                  products: res,
                  loadStatus: res.length ? dataLoadStatuses.WITH_DATA : dataLoadStatuses.NO_DATA,
                });
              },
              error: () => {
                patchState(store, { loadStatus: dataLoadStatuses.ERROR });
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
