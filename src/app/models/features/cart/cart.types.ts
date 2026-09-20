export type TypedMoney = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

export const FALLBACK_MONEY: TypedMoney = {
  type: 'centPrecision',
  currencyCode: 'EUR',
  centAmount: 0,
  fractionDigits: 2,
};

export type Price = {
  id: string;
  key: string;
  value: TypedMoney;
};

export type LineItem = {
  id: string;
  productId: string;
  productKey?: string;
  name: string;
  image: string;
  quantity: number;
  price: Price;
};

export type CartModel = {
  lineItems: LineItem[];
  discountCode: string | null;
};
