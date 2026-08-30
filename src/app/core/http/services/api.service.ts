import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
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
import { Observable } from 'rxjs';
import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from '../types/api.types';
import { buildUrl } from '../utils/api.utils';
import {
  CustomerGetQueries,
  CustomerGetResponse,
  CustomerPatchResponse,
  CustomerUpdateBody,
} from '@models/http/request/me.type';
import { ApiServiceBase } from './api-service.base';

@Injectable({ providedIn: 'root' })
export class ApiService extends ApiServiceBase {
  private readonly httpClient = inject(HttpClient);

  public override exampleGet(
    request: GetRequest<{ Q: ExampleGetQueries }>,
  ): Observable<ExampleGetResponse> {
    return this.get('example/{{id}}', request);
  }

  public override anonymousSessionAccessTokenPost(
    request: PostRequest<{ Q: AnonymousSessionAccessTokenPostQueries }>,
  ): Observable<AnonymousSessionAccessTokenPostResponse> {
    return this.post(`${environment.apiUrl}/auth/anonymous`, request);
  }

  public override refreshTokenPost(
    request: PostRequest<{ Q: RefreshTokenPostQueries }>,
  ): Observable<RefreshTokenPostResponse> {
    return this.post(`${environment.apiUrl}/auth/refresh`, request);
  }

  public override loginPost(request: PostRequest): Observable<LoginPostResponse> {
    return this.post(`${environment.apiUrl}/auth/login`, request);
  }

  public override customersPost(request: PostRequest): Observable<CustomersPostResponse> {
    return this.post(`${environment.apiUrl}/auth/signup`, request);
  }

  public override customersTokenPost(
    request: PostRequest<{ Q: CustomersTokenPostQueries }>,
  ): Observable<CustomersTokenPostResponse> {
    return this.post(`${environment.apiUrl}/auth/login`, request);
  }

  public override getCatalogProducts(
    request: GetRequest<{ Q: CatalogProductsGetQueries }>,
  ): Observable<ProductPagedQueryResponse> {
    return this.get(`${environment.apiUrl}/products`, request);
  }

  public override getMe(
    request: GetRequest<{ Q: CustomerGetQueries }>,
  ): Observable<CustomerGetResponse> {
    return this.get(`${environment.apiUrl}/me`, request);
  }

  public override updateMe(
    request: PostRequest<{ B: CustomerUpdateBody }>,
  ): Observable<CustomerPatchResponse> {
    return this.post(`${environment.apiUrl}/me`, request);
  }

  private get<R>(url: string, request: GetRequest): Observable<R> {
    return this.httpClient.get<R>(buildUrl(url, request.params, request.queries), {
      headers: request.headers,
    });
  }

  private post<R>(url: string, request: PostRequest): Observable<R> {
    return this.httpClient.post<R>(buildUrl(url, request.params, request.queries), request.body, {
      headers: request.headers,
    });
  }

  private patch<R>(url: string, request: PatchRequest): Observable<R> {
    return this.httpClient.patch<R>(buildUrl(url, request.params, request.queries), request.body, {
      headers: request.headers,
    });
  }

  private put<R>(url: string, request: PutRequest): Observable<R> {
    return this.httpClient.put<R>(buildUrl(url, request.params, request.queries), request.body, {
      headers: request.headers,
    });
  }

  private delete<R>(url: string, request: DeleteRequest): Observable<R> {
    return this.httpClient.delete<R>(buildUrl(url, request.params, request.queries), {
      headers: request.headers,
    });
  }
}
