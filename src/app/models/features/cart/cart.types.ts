export type TypedMoney = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

export type Price = {
  id: string;
  key: string;
  value: TypedMoney;
};

export type LineItem = {
  id: string;
  key: string;
  productId: string;
  productKey: string;
  name: string;
  productType: string;
  price: Price;
};

export type CartModel = {
  id: string;
  version: number;
  key: string;
  customerId: string;
  customerEmail: string;
  store: string;
  lineItems: LineItem[];
};
