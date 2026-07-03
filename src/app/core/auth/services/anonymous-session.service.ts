import { Injectable, inject, signal } from '@angular/core';
import { ApiService, getBasicAuthHeader } from '@core/http';
import { LocalStorage } from '@core/local-storage';
import { environment } from '@environments/environment';
import { AnonymousSessionAccessTokenPostResponse } from '@models/http';
import { timeBasedId } from '@shared/utils';
import { EMPTY, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnonymousSessionService {
  private readonly localStorageService = inject(LocalStorage);
  private readonly apiService = inject(ApiService);
  private anonymousId = signal(
    this.localStorageService.getValue<string>(environment.LOCAL_STORAGE_KEYS.anonymousId),
  );
  private accessToken = signal(
    this.localStorageService.getValue<string>(environment.LOCAL_STORAGE_KEYS.anonymousToken),
  );
  private readonly refreshToken = signal(
    this.localStorageService.getValue<string>(environment.LOCAL_STORAGE_KEYS.refreshToken),
  );
  private tokenFetchStarted = false;

  constructor() {
    this.ensureAccessToken();
  }

  ensureAccessToken(): Observable<void> | Observable<AnonymousSessionAccessTokenPostResponse> {
    if (!this.anonymousId()) {
      this.anonymousId.set(timeBasedId());
      this.localStorageService.setValue(
        environment.LOCAL_STORAGE_KEYS.anonymousId,
        this.anonymousId(),
      );
    }

    if (this.accessToken() || this.tokenFetchStarted) {
      return EMPTY;
    }

    const id = this.anonymousId();
    if (!id) {
      throw new Error('Cannot get an anonymous ID');
      return EMPTY;
    }

    this.tokenFetchStarted = true;

    return this.fetchAccessToken(id).pipe(
      tap((response) => {
        const { access_token, refresh_token } = response;
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.anonymousToken,
          access_token,
        );
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.refreshToken,
          refresh_token,
        );
        this.accessToken.set(access_token);
        return response;
      }),
      finalize(() => {
        this.tokenFetchStarted = false;
      }),
    );
  }

  fetchAccessToken(anonymousId: string): Observable<AnonymousSessionAccessTokenPostResponse> {
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
          refresh_token: this.refreshToken() ?? '',
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
    return this.accessToken();
  }

  getAnonymousId() {
    return this.anonymousId();
  }
}
