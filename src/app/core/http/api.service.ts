import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { buildUrl } from './api.utils';
import { DeleteRequest, GetRequest, PatchRequest, PostRequest, PutRequest } from './api.types';
import { Observable } from 'rxjs';
import { ExampleGetQueries } from '../../types/http-request/example.types';
import { ExampleGetResponse } from '../../types/http-response/example.types';
import { AppCredentialsAccessTokenPostQueries } from '../../types/http-request/app-credentials.types';
import { environment } from '../../../environments/environment';
import { AppCredentialsAccessTokenPostResponse } from '../../types/http-response/app-credentials.types';
import {
  AnonymousSessionAccessTokenPostQueries,
  AnonymousSessionAccessTokenPostResponse,
} from '../../types/http-request/anonymous-token.type';
import {
  RefreshTokenPostQueries,
  RefreshTokenPostResponse,
} from '../../types/http-request/refresh-token.type';
import { LoginPostResponse } from '../../types/http-request/login.type';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly httpClient = inject(HttpClient);

  exampleGet(request: GetRequest<{ Q: ExampleGetQueries }>): Observable<ExampleGetResponse> {
    return this.get('example/{{id}}', request);
  }

  appCredentialsAccessTokenPost(
    request: PostRequest<{ Q: AppCredentialsAccessTokenPostQueries }>,
  ): Observable<AppCredentialsAccessTokenPostResponse> {
    return this.post(`${environment.commercetools.authUrl}/oauth/token`, request);
  }

  public anonymousSessionAccessTokenPost(
    request: PostRequest<{ Q: AnonymousSessionAccessTokenPostQueries }>,
  ): Observable<AnonymousSessionAccessTokenPostResponse> {
    return this.post(`${environment.commercetools.authUrl}/anonymous/token`, request);
  }

  public refreshTokenPost(
    request: PostRequest<{ Q: RefreshTokenPostQueries }>,
  ): Observable<RefreshTokenPostResponse> {
    return this.post(`${environment.commercetools.authUrl}/oauth/token`, request);
  }

  public loginPost(request: PostRequest): Observable<LoginPostResponse> {
    return this.post(`${environment.commercetools.apiUrl}/login`, request);
  }

  private get<R>(url: string, request: GetRequest): Observable<R> {
    return this.httpClient.get<R>(buildUrl(url, request.params, request.queries));
  }

  private post<R>(url: string, request: PostRequest): Observable<R> {
    return this.httpClient.post<R>(buildUrl(url, request.params, request.queries), request.body);
  }

  private patch<R>(url: string, request: PatchRequest): Observable<R> {
    return this.httpClient.patch<R>(buildUrl(url, request.params, request.queries), request.body);
  }

  private put<R>(url: string, request: PutRequest): Observable<R> {
    return this.httpClient.put<R>(buildUrl(url, request.params, request.queries), request.body);
  }

  private delete<R>(url: string, request: DeleteRequest): Observable<R> {
    return this.httpClient.delete<R>(buildUrl(url, request.params, request.queries));
  }
}
