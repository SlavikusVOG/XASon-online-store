import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../../types/features/catalog/product.types';
import { ProductCard } from '../../../catalog/components/product-card/product-card';

@Component({
  selector: 'xas-featured-products',
  imports: [RouterLink, ProductCard],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProducts {
  readonly products = input.required<Product[]>();

  readonly addedToCart = output<Product>();
  readonly removedFromCart = output<Product>();

  addToCart(product: Product): void {
    this.addedToCart.emit(product);
  }

  removeFromCart(product: Product): void {
    this.removedFromCart.emit(product);
  }
}
