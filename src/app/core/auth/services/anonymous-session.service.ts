import { Injectable, inject, signal } from '@angular/core';
import { ApiService } from '@core/http';
import { LocalStorage } from '@core/local-storage';
import { environment } from '@environments/environment';
import { AnonymousSessionAccessTokenPostResponse } from '@models/http';
import { timeBasedId } from '@shared/utils';
import { finalize, map, Observable, of, shareReplay, tap } from 'rxjs';

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
    this.localStorageService.getValue<string>(environment.LOCAL_STORAGE_KEYS.anonymousRefreshToken),
  );
  private tokenRequest$: Observable<string> | null = null;

  ensureAccessToken(): Observable<string> {
    if (!this.anonymousId()) {
      this.anonymousId.set(timeBasedId());
      this.localStorageService.setValue(
        environment.LOCAL_STORAGE_KEYS.anonymousId,
        this.anonymousId(),
      );
    }

    const existing = this.accessToken();
    if (existing) {
      return of(existing);
    }

    if (this.tokenRequest$) {
      return this.tokenRequest$;
    }

    const id = this.anonymousId();
    if (!id) {
      throw new Error('Cannot get an anonymous ID');
    }

    this.tokenRequest$ = this.fetchAccessToken(id).pipe(
      tap((response) => {
        const { access_token, refresh_token } = response;
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.anonymousToken,
          access_token,
        );
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.anonymousRefreshToken,
          refresh_token,
        );
        this.accessToken.set(access_token);
        this.refreshToken.set(refresh_token);
      }),
      map((response) => response.access_token),
      finalize(() => {
        this.tokenRequest$ = null;
      }),
      shareReplay(1),
    );

    return this.tokenRequest$;
  }

  private fetchAccessToken(
    anonymousId: string,
  ): Observable<AnonymousSessionAccessTokenPostResponse> {
    return this.apiService.anonymousSessionAccessTokenPost({
      queries: {
        grant_type: 'client_credentials',
        scope: environment.commercetools.scopes.join(' '),
      },
      body: {
        anonymous_id: anonymousId,
      },
      headers: {
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
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .subscribe((response) => {
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.anonymousToken,
          response['access_token'],
        );
        this.accessToken.set(response['access_token']);
      });
  }

  getAccessToken() {
    return this.accessToken();
  }

  getAnonymousId() {
    return this.anonymousId();
  }
}
