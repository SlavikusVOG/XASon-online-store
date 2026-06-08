import { Injectable, inject } from '@angular/core';
import { ApiService, getBasicAuthHeader } from '@core/http';
import { LocalStorage } from '@core/local-storage';
import { environment } from '@environments/environment';
import { timeBasedId } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AnonymousSessionService {
  private readonly localStorageService = inject(LocalStorage);
  private readonly apiService = inject(ApiService);
  private anonymousId = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.anonymousId,
  );
  private accessToken = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.anonymousToken,
  );
  private readonly refreshToken = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.refreshToken,
  );
  constructor() {
    if (!this.anonymousId) {
      this.anonymousId = timeBasedId();
      this.fetchAccessToken(this.anonymousId).subscribe((response) => {
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
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.anonymousId,
          this.anonymousId,
        );
      });
    }
  }

  fetchAccessToken(anonymousId: string) {
    return this.apiService.anonymousSessionAccessTokenPost({
      queries: {
        grant_type: 'client_credentials',
        scope: environment.commercetools.scopes.join(' '),
        anonymous_id: anonymousId,
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
