import { Component, computed, input, output } from '@angular/core';
import { LineItem } from '@models/features/cart';
import { PricePipe } from '@shared/pipes';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'xas-cart-item',
  imports: [PricePipe, TuiButton, TuiIcon],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  readonly item = input.required<LineItem>();
  readonly disabled = input(false);

  readonly quantityChange = output<{ lineItemId: string; quantity: number }>();
  readonly removeItem = output<string>();

  protected readonly name = computed(
    () => this.item().name['en-US'] ?? Object.values(this.item().name)[0] ?? '',
  );
  protected readonly imageUrl = computed(() => this.item().variant?.images?.[0]?.url ?? '');

  protected increaseQuantity(): void {
    const item = this.item();
    this.quantityChange.emit({ lineItemId: item.id, quantity: item.quantity + 1 });
  }

  protected decreaseQuantity(): void {
    const item = this.item();
    if (item.quantity <= 1) {
      this.removeItem.emit(item.id);
      return;
    }
    this.quantityChange.emit({ lineItemId: item.id, quantity: item.quantity - 1 });
  }

  protected onRemove(): void {
    this.removeItem.emit(this.item().id);
  }
}
