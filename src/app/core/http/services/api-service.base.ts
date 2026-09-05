import { CatalogProductsGetQueries, ProductPagedQueryResponse } from '@models/features/catalog';
import {
  AnonymousSessionAccessTokenPostQueries,
  AnonymousSessionAccessTokenPostResponse,
  CustomersPostResponse,
  CustomersTokenPostQueries,
  CustomersTokenPostResponse,
  ExampleGetQueries,
  ExampleGetResponse,
  LoginPostResponse,
  RefreshTokenPostQueries,
  RefreshTokenPostResponse,
} from '@models/http';
import {
  CustomerGetQueries,
  CustomerGetResponse,
  CustomerPatchResponse,
  CustomerUpdateBody,
} from '@models/http/request/me.type';
import { Observable } from 'rxjs';
import { GetRequest, PostRequest } from '../types/api.types';

export abstract class ApiServiceBase {
  abstract exampleGet(
    request: GetRequest<{ Q: ExampleGetQueries }>,
  ): Observable<ExampleGetResponse>;

  abstract anonymousSessionAccessTokenPost(
    request: PostRequest<{ Q: AnonymousSessionAccessTokenPostQueries }>,
  ): Observable<AnonymousSessionAccessTokenPostResponse>;

  abstract refreshTokenPost(
    request: PostRequest<{ Q: RefreshTokenPostQueries }>,
  ): Observable<RefreshTokenPostResponse>;

  abstract loginPost(request: PostRequest): Observable<LoginPostResponse>;

  abstract customersPost(request: PostRequest): Observable<CustomersPostResponse>;

  abstract customersTokenPost(
    request: PostRequest<{ Q: CustomersTokenPostQueries }>,
  ): Observable<CustomersTokenPostResponse>;

  abstract getCatalogProducts(
    request: GetRequest<{ Q: CatalogProductsGetQueries }>,
  ): Observable<ProductPagedQueryResponse>;

  abstract getMe(request: GetRequest<{ Q: CustomerGetQueries }>): Observable<CustomerGetResponse>;

  abstract updateMe(
    request: PostRequest<{ B: CustomerUpdateBody }>,
  ): Observable<CustomerPatchResponse>;
}
