import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { CartItem } from '@features/cart/components/cart-item/cart-item';
import { LineItem, TypedMoney } from '@models/features/cart';
import { PricePipe } from '@shared/pipes';
import {
  TuiButton,
  TuiInputDirective,
  TuiTextfieldComponent,
  TuiTextfieldOptionsDirective,
  TuiTitle,
} from '@taiga-ui/core';

@Component({
  selector: 'xas-cart',
  imports: [
    CartItem,
    CurrencyPipe,
    PricePipe,
    TuiButton,
    TuiInputDirective,
    TuiTextfieldComponent,
    TuiTextfieldOptionsDirective,
    TuiTitle,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly lineItems = input.required<LineItem[]>();
  readonly subtotal = input.required<number>();
  readonly discountAmount = input.required<number>();
  readonly total = input.required<number>();
  readonly discountCode = input<string | null>(null);

  readonly quantityChanged = output<{ id: string; quantity: number }>();
  readonly itemRemoved = output<string>();
  readonly cleared = output<void>();
  readonly promoApplied = output<string>();
  readonly promoRemoved = output<void>();

  protected readonly promoInput = signal('');

  protected readonly currencyCode = computed(
    () => this.lineItems()[0]?.price.value.currencyCode ?? 'EUR',
  );

  protected readonly hasDiscount = computed(() => this.discountAmount() > 0);

  protected asMoney(centAmount: number): TypedMoney {
    return {
      type: 'centPrecision',
      currencyCode: this.currencyCode(),
      centAmount,
      fractionDigits: 2,
    };
  }

  protected onQuantityChanged(id: string, quantity: number): void {
    this.quantityChanged.emit({ id, quantity });
  }

  protected onItemRemoved(id: string): void {
    this.itemRemoved.emit(id);
  }

  protected onPromoInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.promoInput.set(target.value);
    }
  }

  protected applyPromo(): void {
    const code = this.promoInput().trim();
    if (!code) {
      return;
    }

    this.promoApplied.emit(code);
  }

  protected removePromo(): void {
    this.promoRemoved.emit();
    this.promoInput.set('');
  }

  protected clearCart(): void {
    this.cleared.emit();
  }
}
