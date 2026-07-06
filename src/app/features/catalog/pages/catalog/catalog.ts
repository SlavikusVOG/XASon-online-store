import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ProductCard, ProductCardSkeleton } from '@features/catalog/components';
import { CatalogStore } from '@features/catalog/store';
import { Product } from '@models/features/catalog';
import { DataPlaceholder } from '@shared/components';
import { DATA_LOAD_STATUSES } from '@shared/const';
import { CircleAlert, PackageSearch } from 'lucide';

@Component({
  selector: 'xas-catalog',
  imports: [DataPlaceholder, ProductCard, ProductCardSkeleton],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalog implements OnInit {
  public readonly DATA_LOAD_STATUSES = DATA_LOAD_STATUSES;
  public readonly skeletonItems = Array.from({ length: 10 }, (_, index) => index);
  public readonly emptyPlaceholderIcon = PackageSearch;
  public readonly errorPlaceholderIcon = CircleAlert;

  public readonly catalogStore = inject(CatalogStore);

  public ngOnInit(): void {
    this.catalogStore.loadProducts();
  }

  public retryLoad(): void {
    this.catalogStore.loadProducts();
  }

  public addToCart(product: Product): void {
    this.catalogStore.addToCart(product);
  }

  public removeFromCart(product: Product): void {
    this.catalogStore.removeFromCart(product);
  }
}
