import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGES } from '@core/router/pages.const';
import { Cart } from '@features/cart/components';
import { CartStore } from '@features/cart/store';
import { ToastService } from '@shared/services';
import { TuiButton, TuiTitle } from '@taiga-ui/core';

@Component({
  selector: 'xas-cart-page',
  imports: [Cart, RouterLink, TuiButton, TuiTitle],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  protected readonly PAGES = PAGES;
  protected readonly cartStore = inject(CartStore);
  private readonly toastService = inject(ToastService);

  onQuantityChanged({ id, quantity }: { id: string; quantity: number }): void {
    this.cartStore.changeQuantity(id, quantity);
  }

  onItemRemoved(id: string): void {
    this.cartStore.removeProduct(id);
  }

  onCleared(): void {
    this.cartStore.clear();
  }

  onPromoApplied(code: string): void {
    const applied = this.cartStore.applyPromoCode(code);
    if (applied) {
      this.toastService.showSuccessToast('Promo code applied');
      return;
    }

    this.toastService.showErrorToast('Invalid promo code');
  }

  onPromoRemoved(): void {
    this.cartStore.removePromoCode();
  }
}
