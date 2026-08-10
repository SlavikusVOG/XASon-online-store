import { Component, inject, OnInit } from '@angular/core';
import { Cart } from '@features/cart/components';
import { CartStore } from '@features/cart/store';
import { DataPlaceholder } from '@shared/components';
import { DATA_LOAD_STATUSES } from '@shared/const';
import { CircleAlert, ShoppingCart } from 'lucide';

@Component({
  selector: 'xas-cart-page',
  imports: [Cart, DataPlaceholder],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage implements OnInit {
  public readonly DATA_LOAD_STATUSES = DATA_LOAD_STATUSES;
  public readonly emptyPlaceholderIcon = ShoppingCart;
  public readonly errorPlaceholderIcon = CircleAlert;

  public readonly cartStore = inject(CartStore);

  public ngOnInit(): void {
    this.cartStore.loadActiveCart();
  }

  public retryLoad(): void {
    this.cartStore.loadActiveCart();
  }

  public onQuantityChange(event: { lineItemId: string; quantity: number }): void {
    this.cartStore.changeLineItemQuantity(event);
  }

  public onRemoveItem(lineItemId: string): void {
    this.cartStore.removeLineItem(lineItemId);
  }

  public onClearCart(): void {
    this.cartStore.clearCart();
  }
}
