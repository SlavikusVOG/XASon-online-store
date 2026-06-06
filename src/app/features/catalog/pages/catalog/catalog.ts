import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductCard } from '@features/catalog/components';
import { Product } from '@models/features/catalog';
import { DATA_LOAD_STATUSES } from '@shared/const';
import { CatalogStore } from '../../state/catalog.store';

@Component({
  selector: 'xas-catalog',
  imports: [ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalog implements OnInit {
  public readonly DATA_LOAD_STATUSES = DATA_LOAD_STATUSES;

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
