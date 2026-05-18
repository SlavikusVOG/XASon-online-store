import { Component } from '@angular/core';

type TypedMoney = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

type Price = {
  id: string;
  key: string;
  value: TypedMoney;
};

type LineItem = {
  id: string;
  key: string;
  productId: string;
  productKey: string;
  name: string;
  productType: string;
  price: Price;
};

type CartItem = {
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
  fetchCartItems(): CartItem[] {
    return [];
  }
}
