import { inject, Service, signal } from '@angular/core';
import { ApiService, getBasicAuthHeader } from '@core/http';
import { Product, ProductDto, ProductPagedQueryResponse } from '@models/features/catalog';
import { tap } from 'rxjs';

@Service()
export class ProductsService {
  private api = inject(ApiService);
  private _data = signal<Product[]>([]);
  private _loading = signal<boolean>(false);

  loadData(limit: number, offset: number) {
    this._loading.set(true);
    return this.api
      .getCatalogProducts({
        params: {
          limit,
          offset,
        },
        headers: {
          Authorization: getBasicAuthHeader(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        tap((response: ProductPagedQueryResponse) => {
          const productsDto = response.results;
          const products = this.processDtoData(productsDto);
          this._data.set(products);
        }),
      );
  }

  processDtoData(productsDto: ProductDto[]): Product[] {
    return productsDto.map(
      (item) =>
        ({
          id: item.id,
          name: item.masterData.current.name,
          image: item.masterData.current.variants.images[0],
          description: '',
          isInCart: false,
        }) as unknown as Product,
    );
  }

  getData(): Product[] {
    return this._data();
  }
}
