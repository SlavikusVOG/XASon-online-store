import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiTitle } from '@taiga-ui/core';
import { PAGES } from '@core/router/pages.const';
import { ProductCard } from '@features/catalog/components';
import { Product } from '@models/features/catalog';

@Component({
  selector: 'xas-featured-products',
  imports: [RouterLink, TuiTitle, ProductCard],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProducts {
  readonly PAGES = PAGES;

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
