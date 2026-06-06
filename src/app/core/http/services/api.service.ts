import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Product } from '@models/features/catalog';
import {
  AnonymousSessionAccessTokenPostQueries,
  AnonymousSessionAccessTokenPostResponse,
  AppCredentialsAccessTokenPostQueries,
  AppCredentialsAccessTokenPostResponse,
  CustomersPostResponse,
  CustomersTokenPostQueries,
  CustomersTokenPostResponse,
  ExampleGetQueries,
  ExampleGetResponse,
  LoginPostResponse,
  RefreshTokenPostQueries,
  RefreshTokenPostResponse,
} from '@models/http';
import { delay, Observable, of } from 'rxjs';
import { catalogProducts } from '../../../mocks/catalog.mocks';
import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from '../types/api.types';
import { buildUrl } from '../utils/api.utils';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly httpClient = inject(HttpClient);

  exampleGet(request: GetRequest<{ Q: ExampleGetQueries }>): Observable<ExampleGetResponse> {
    return this.get('example/{{id}}', request);
  }

  // TODO: move to backend for frontend
  public appCredentialsAccessTokenPost(
    request: PostRequest<{ Q: AppCredentialsAccessTokenPostQueries }>,
  ): Observable<AppCredentialsAccessTokenPostResponse> {
    return this.post(`${environment.commercetools.authUrl}/oauth/token`, request);
  }

  public anonymousSessionAccessTokenPost(
    request: PostRequest<{ Q: AnonymousSessionAccessTokenPostQueries }>,
  ): Observable<AnonymousSessionAccessTokenPostResponse> {
    return this.post(
      `${environment.commercetools.authUrl}/oauth/${environment.commercetools.projectKey}/anonymous/token`,
      request,
    );
  }

  public refreshTokenPost(
    request: PostRequest<{ Q: RefreshTokenPostQueries }>,
  ): Observable<RefreshTokenPostResponse> {
    return this.post(`${environment.commercetools.authUrl}/oauth/token`, request);
  }

  public loginPost(request: PostRequest): Observable<LoginPostResponse> {
    return this.post(
      `${environment.commercetools.apiUrl}/${environment.commercetools.projectKey}/login`,
      request,
    );
  }

  public customersPost(request: PostRequest): Observable<CustomersPostResponse> {
    return this.post(
      `${environment.commercetools.apiUrl}/${environment.commercetools.projectKey}/customers`,
      request,
    );
  }

  public customersTokenPost(
    request: PostRequest<{ Q: CustomersTokenPostQueries }>,
  ): Observable<CustomersTokenPostResponse> {
    return this.post(
      `${environment.commercetools.authUrl}/oauth/${environment.commercetools.projectKey}/customers/token`,
      request,
    );
  }

  getCatalogProducts(): Observable<Product[]> {
    return of(catalogProducts).pipe(delay(5_000));
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
