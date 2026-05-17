import { Injectable, signal } from '@angular/core';
import { Product } from '../../../types/features/catalog/product.types';
import { catalogProducts } from '../../../mocks/catalog.mocks';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  readonly products = signal<Product[]>(catalogProducts);

  addToCart(product: Product): void {
    this.products.update((products) =>
      products.map((item) => (item.id === product.id ? { ...item, isInCart: true } : item)),
    );
  }

  removeFromCart(product: Product): void {
    this.products.update((products) =>
      products.map((item) => (item.id === product.id ? { ...item, isInCart: false } : item)),
    );
  }
}
