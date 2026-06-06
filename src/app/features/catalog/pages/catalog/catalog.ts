import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { dataLoadStatuses } from '../../../../shared/const/data-load-statuses.const';
import { Product } from '../../../../types/features/catalog/product.types';
import { ProductCard } from '../../components/product-card/product-card';
import { CatalogStore } from '../../state/catalog.store';

@Component({
  selector: 'xas-catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalog implements OnInit {
  public readonly dataLoadStatuses = dataLoadStatuses;

  public readonly catalogStore = inject(CatalogStore);

  public ngOnInit(): void {
    this.catalogStore.loadProducts();
  }

  public addToCart(product: Product): void {
    this.catalogStore.addToCart(product);
  }

  public removeFromCart(product: Product): void {
    this.catalogStore.removeFromCart(product);
  }
}
