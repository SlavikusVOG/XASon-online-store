export type TypedMoney = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

export type Price = {
  id: string;
  key?: string;
  value: TypedMoney;
};

export type LineItemImage = {
  url: string;
  dimensions?: { w: number; h: number };
};

export type LineItemVariant = {
  id: number;
  sku?: string;
  key?: string;
  images?: LineItemImage[];
};

export type LineItem = {
  id: string;
  key?: string;
  productId: string;
  productKey?: string;
  name: Record<string, string>;
  productType?: { typeId: string; id: string };
  quantity: number;
  price: Price;
  totalPrice: TypedMoney;
  variant?: LineItemVariant;
};

export type CartModel = {
  id: string;
  version: number;
  key?: string;
  customerId?: string;
  customerEmail?: string;
  store?: string;
  lineItems: LineItem[];
  totalPrice?: TypedMoney;
};
