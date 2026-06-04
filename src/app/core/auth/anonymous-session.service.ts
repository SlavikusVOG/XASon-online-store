import { Injectable, inject } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { ApiService } from '../http/api.service';
import { environment } from '../../../environments/environment';
import { AnonymousSessionAccessTokenPostResponse } from '../../types/http-request/anonymous-token.type';
import { getBasicAuthHeader } from '../http/api.utils';

@Injectable({
  providedIn: 'root',
})
export class AnonymousSessionService {
  private readonly localStorageService = inject(LocalStorage);
  private readonly apiService = inject(ApiService);
  private accessToken = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.anonymousToken,
  );
  private readonly refreshToken = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.refreshToken,
  );
  constructor() {
    if (!this.accessToken) {
      this.fetchAccessToken().subscribe((response: AnonymousSessionAccessTokenPostResponse) => {
        const { access_token, refresh_token } = response;
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.anonymousToken,
          access_token,
        );
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.refreshToken,
          refresh_token,
        );
        this.accessToken = access_token;
      });
    }
  }

  fetchAccessToken() {
    return this.apiService.anonymousSessionAccessTokenPost({
      queries: {
        grant_type: 'client_credentials',
        scope: environment.commercetools.scopes.join(' '),
      },
      params: {
        credentials: 'include',
      },
      headers: {
        Authorization: getBasicAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  refreshAccessToken() {
    this.apiService
      .refreshTokenPost({
        queries: {
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken ?? '',
        },
        headers: {
          Authorization: getBasicAuthHeader(),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .subscribe((response) => {
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.anonymousToken,
          response['access_token'],
        );
      });
  }

  getAccessToken() {
    return this.accessToken;
  }
}
