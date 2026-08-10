import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '@core/http';
import { CartModel } from '@models/features/cart';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { DATA_LOAD_STATUSES, DataLoadStatus } from '@shared/const';
import { catchError, EMPTY, pipe, switchMap, tap, throwError } from 'rxjs';

const DEFAULT_CURRENCY = 'USD';

type CartState = {
  cart: CartModel | null;
  loadStatus: DataLoadStatus;
  mutating: boolean;
};

const initialState: CartState = {
  cart: null,
  loadStatus: DATA_LOAD_STATUSES.INIT,
  mutating: false,
};

function cartLoadStatus(cart: CartModel): DataLoadStatus {
  return cart.lineItems.length > 0 ? DATA_LOAD_STATUSES.WITH_DATA : DATA_LOAD_STATUSES.NO_DATA;
}

export const CartStore = signalStore(
  withState(initialState),
  withMethods((store, apiService = inject(ApiService)) => {
    const createEmptyCart = () =>
      apiService.createCart({
        body: { currency: DEFAULT_CURRENCY },
        headers: { 'Content-Type': 'application/json' },
      });

    const patchCartSuccess = (cart: CartModel) => {
      patchState(store, {
        cart,
        loadStatus: cartLoadStatus(cart),
        mutating: false,
      });
    };

    const patchCartError = () => {
      patchState(store, {
        loadStatus: DATA_LOAD_STATUSES.ERROR,
        mutating: false,
      });
    };

    return {
      loadActiveCart: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loadStatus: DATA_LOAD_STATUSES.LOADING })),
          switchMap(() =>
            apiService.getActiveCart().pipe(
              catchError((error: unknown) => {
                if (error instanceof HttpErrorResponse && error.status === 404) {
                  return createEmptyCart();
                }
                return throwError(() => error);
              }),
              tapResponse({
                next: (cart) => patchCartSuccess(cart),
                error: () => patchCartError(),
              }),
            ),
          ),
        ),
      ),

      changeLineItemQuantity: rxMethod<{ lineItemId: string; quantity: number }>(
        pipe(
          tap(() => patchState(store, { mutating: true })),
          switchMap(({ lineItemId, quantity }) => {
            const cart = store.cart();
            if (!cart) {
              patchState(store, { mutating: false });
              return EMPTY;
            }

            return apiService
              .updateCart({
                params: { id: cart.id },
                body: {
                  version: cart.version,
                  actions: [{ action: 'changeLineItemQuantity', lineItemId, quantity }],
                },
                headers: { 'Content-Type': 'application/json' },
              })
              .pipe(
                tapResponse({
                  next: (updated) => patchCartSuccess(updated),
                  error: () => patchCartError(),
                }),
              );
          }),
        ),
      ),

      removeLineItem: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { mutating: true })),
          switchMap((lineItemId) => {
            const cart = store.cart();
            if (!cart) {
              patchState(store, { mutating: false });
              return EMPTY;
            }

            return apiService
              .updateCart({
                params: { id: cart.id },
                body: {
                  version: cart.version,
                  actions: [{ action: 'removeLineItem', lineItemId }],
                },
                headers: { 'Content-Type': 'application/json' },
              })
              .pipe(
                tapResponse({
                  next: (updated) => patchCartSuccess(updated),
                  error: () => patchCartError(),
                }),
              );
          }),
        ),
      ),

      clearCart: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { mutating: true })),
          switchMap(() => {
            const cart = store.cart();
            if (!cart) {
              patchState(store, { mutating: false });
              return EMPTY;
            }

            return apiService
              .deleteCart({
                params: { id: cart.id },
                queries: { version: cart.version },
              })
              .pipe(
                switchMap(() => createEmptyCart()),
                tapResponse({
                  next: (created) => patchCartSuccess(created),
                  error: () => patchCartError(),
                }),
              );
          }),
        ),
      ),
    };
  }),
);
