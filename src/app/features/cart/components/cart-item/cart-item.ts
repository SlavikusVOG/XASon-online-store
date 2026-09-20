import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { LineItem, TypedMoney } from '@models/features/cart';
import { PricePipe } from '@shared/pipes';
import { TuiButton, TuiIcon, TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'xas-cart-item',
  imports: [CurrencyPipe, NgOptimizedImage, PricePipe, TuiButton, TuiIcon, TuiTitle],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  readonly item = input.required<LineItem>();

  readonly quantityChanged = output<number>();
  readonly removed = output<void>();

  protected readonly lineTotal = computed((): TypedMoney => {
    const item = this.item();
    return {
      ...item.price.value,
      centAmount: item.price.value.centAmount * item.quantity,
    };
  });

  protected decreaseQuantity(): void {
    const quantity = this.item().quantity;
    if (quantity <= 1) {
      return;
    }

    this.quantityChanged.emit(quantity - 1);
  }

  protected increaseQuantity(): void {
    this.quantityChanged.emit(this.item().quantity + 1);
  }

  protected removeItem(): void {
    this.removed.emit();
  }
}
