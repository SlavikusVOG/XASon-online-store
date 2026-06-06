import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CatalogService } from '../../../catalog/state/catalog.service';
import { Product } from '../../../../types/features/catalog/product.types';
import { banners, categories, promoCodes } from '../../../../mocks/main.mocks';
import { PromoBanner } from '../../components/promo-banner/promo-banner';
import { CategoryNav } from '../../components/category-nav/category-nav';
import { FeaturedProducts } from '../../components/featured-products/featured-products';
import { PromoCodesDisplay } from '../../components/promo-codes-display/promo-codes-display';

@Component({
  selector: 'xas-home-page',
  imports: [PromoBanner, CategoryNav, FeaturedProducts, PromoCodesDisplay],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private readonly catalogService = inject(CatalogService);

  readonly banners = banners;
  readonly categories = categories;
  readonly promoCodes = promoCodes;
  readonly products = this.catalogService.products.asReadonly();

  addToCart(product: Product): void {
    this.catalogService.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.catalogService.removeFromCart(product);
  }
}
