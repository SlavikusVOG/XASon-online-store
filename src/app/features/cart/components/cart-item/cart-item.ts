import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'xas-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './cart-item.scss',
})
export class CartItem {
  protected readonly item = input.required<CartItem>();
  protected readonly itemQuantity = input.required<number>();
  // protected readonly price = computed(() =>
  //   // TODO: add price calculation
  // );
}
