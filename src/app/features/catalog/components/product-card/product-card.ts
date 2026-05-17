import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../../../types/features/catalog/product.types';
import { YesNoPipe } from '../../../../shared/pipes/yes-no.pipe';

@Component({
  selector: 'xas-product-card',
  imports: [YesNoPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  readonly product = input.required<Product>();

  readonly addedToCart = output<Product>();
  readonly removedFromCart = output<Product>();

  addToCart(): void {
    this.addedToCart.emit(this.product());
  }

  removeFromCart(): void {
    this.removedFromCart.emit(this.product());
  }
}
