import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiTitle } from '@taiga-ui/core';
import { PAGES } from '@core/router/pages.const';
import { ProductCard, ProductCardSkeleton } from '@features/catalog/components';
import { CatalogStore } from '@features/catalog/store';
import { Product } from '@models/features/catalog';
import { DataPlaceholder } from '@shared/components';
import { DATA_LOAD_STATUSES } from '@shared/const';
import { CircleAlert, PackageSearch } from 'lucide';

const FEATURED_PRODUCTS_COUNT = 4;

@Component({
  selector: 'xas-featured-products',
  imports: [RouterLink, TuiTitle, ProductCard, ProductCardSkeleton, DataPlaceholder],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedProducts {
  readonly PAGES = PAGES;
  readonly DATA_LOAD_STATUSES = DATA_LOAD_STATUSES;
  readonly skeletonItems = Array.from({ length: FEATURED_PRODUCTS_COUNT }, (_, index) => index);
  readonly featuredProductsCount = FEATURED_PRODUCTS_COUNT;
  readonly emptyPlaceholderIcon = PackageSearch;
  readonly errorPlaceholderIcon = CircleAlert;

  readonly catalogStore = inject(CatalogStore);

  addToCart(product: Product): void {
    this.catalogStore.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.catalogStore.removeFromCart(product);
  }

  retryLoad(): void {
    this.catalogStore.loadProducts();
  }
}
