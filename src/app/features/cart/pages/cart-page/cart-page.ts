import { Component, signal } from '@angular/core';

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

export type Cart = {
  id: string;
  version: number;
  key: string;
  customerId: string;
  customerEmail: string;
  store: string;
  lineItems: LineItem[];
};

@Component({
  selector: 'xas-cart-page',
  imports: [],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  protected readonly cartItems = signal<Cart[]>([]);
  private fetchCartItems(): Cart {
    return {
      id: '1',
      version: 1,
      key: '1',
      customerId: '1',
      customerEmail: 'test@test.com',
      store: 'test',
      lineItems: [],
    };
  }
}
