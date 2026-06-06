import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '@models/features/catalog';
import { YesNoPipe } from '@shared/pipes';

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
