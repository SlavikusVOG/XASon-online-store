import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService } from '../../state/catalog.service';
import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../../../types/features/catalog/product.types';

@Component({
  selector: 'xas-catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalog {
  private readonly catalogService = inject(CatalogService);

  readonly products = this.catalogService.products.asReadonly();

  addToCart(product: Product): void {
    this.catalogService.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.catalogService.removeFromCart(product);
  }
}
