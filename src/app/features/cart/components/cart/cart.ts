import { Component, computed, input } from '@angular/core';
import { CartModel, LineItem } from '@models/features/cart';

@Component({
  selector: 'xas-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected readonly cart = input.required<CartModel>();
  protected readonly totalPrice = computed(() =>
    this.cart().lineItems.reduce((acc, item) => acc + this.getItemPrice(item), 0),
  );
  private getItemPrice(item: LineItem): number {
    return item.price.value.centAmount / 100;
  }
}
