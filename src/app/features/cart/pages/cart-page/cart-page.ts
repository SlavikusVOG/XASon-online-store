import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CartModel } from '@models/features/cart';

@Component({
  selector: 'xas-cart-page',
  imports: [],
  templateUrl: './cart-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cart-page.scss',
})
export class CartPage {
  protected readonly cartItems = signal<CartModel[]>([]);
  private fetchCartItems(): CartModel {
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
