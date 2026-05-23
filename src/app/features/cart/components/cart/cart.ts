import { Component, computed, input } from '@angular/core';
import { LineItem } from '../../pages/cart-page/cart-page';
import { Cart as CartType } from '../../pages/cart-page/cart-page';

@Component({
  selector: 'xas-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected readonly cart = input.required<CartType>();
  protected readonly totalPrice = computed(() =>
    this.cart().lineItems.reduce((acc, item) => acc + this.getItemPrice(item), 0),
  );
  private getItemPrice(item: LineItem): number {
    return item.price.value.centAmount / 100;
  }
}
