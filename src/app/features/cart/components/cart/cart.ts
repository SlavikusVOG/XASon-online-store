import { Component, computed, input, output } from '@angular/core';
import { CartItem } from '@features/cart/components/cart-item/cart-item';
import { CartModel } from '@models/features/cart';
import { PricePipe } from '@shared/pipes';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'xas-cart',
  imports: [CartItem, PricePipe, TuiButton],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cart = input.required<CartModel>();
  readonly disabled = input(false);

  readonly quantityChange = output<{ lineItemId: string; quantity: number }>();
  readonly removeItem = output<string>();
  readonly clearCart = output<void>();

  protected readonly totalPrice = computed(() => {
    const cart = this.cart();
    if (cart.totalPrice) {
      return cart.totalPrice;
    }

    const lineItems = cart.lineItems;
    if (!lineItems.length) {
      return null;
    }

    const first = lineItems[0].totalPrice;
    const centAmount = lineItems.reduce((acc, item) => acc + item.totalPrice.centAmount, 0);

    return {
      ...first,
      centAmount,
    };
  });

  protected onQuantityChange(event: { lineItemId: string; quantity: number }): void {
    this.quantityChange.emit(event);
  }

  protected onRemoveItem(lineItemId: string): void {
    this.removeItem.emit(lineItemId);
  }

  protected onClearCart(): void {
    this.clearCart.emit();
  }
}
