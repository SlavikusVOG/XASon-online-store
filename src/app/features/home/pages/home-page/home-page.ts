import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CatalogStore } from '@features/catalog/store';
import { Product } from '@models/features/catalog';
import { banners, categories, promoCodes } from '../../../../mocks/main.mocks';
import {
  CategoryNav,
  FeaturedProducts,
  PromoBanner,
  PromoCodesDisplay,
} from '@features/home/components';

@Component({
  selector: 'xas-home-page',
  imports: [PromoBanner, CategoryNav, FeaturedProducts, PromoCodesDisplay],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  private readonly catalogStore = inject(CatalogStore);

  readonly banners = banners;
  readonly categories = categories;
  readonly promoCodes = promoCodes;
  readonly products = this.catalogStore.products;

  ngOnInit(): void {
    this.catalogStore.loadProducts();
  }

  addToCart(product: Product): void {
    this.catalogStore.addToCart(product);
  }

  removeFromCart(product: Product): void {
    this.catalogStore.removeFromCart(product);
  }
}
