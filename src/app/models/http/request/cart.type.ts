import { CartModel } from '@models/features/cart';

export type CartDraft = {
  currency: string;
};

export type CartChangeLineItemQuantityAction = {
  action: 'changeLineItemQuantity';
  lineItemId: string;
  quantity: number;
};

export type CartRemoveLineItemAction = {
  action: 'removeLineItem';
  lineItemId: string;
};

export type CartUpdateAction = CartChangeLineItemQuantityAction | CartRemoveLineItemAction;

export type CartUpdateBody = {
  version: number;
  actions: CartUpdateAction[];
};

export type CartDeleteQueries = {
  version: number;
};

export type CartGetResponse = CartModel;
export type CartPostResponse = CartModel;
export type CartPagedQueryResponse = {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: CartModel[];
};
