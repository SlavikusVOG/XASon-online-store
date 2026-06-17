import { HttpParams } from '@angular/common/http';
import { Injectable, inject, signal, effect } from '@angular/core';
import { ApiService, getBasicAuthHeader, getBearerAuthHeader } from '@core/http';
import { LocalStorage } from '@core/local-storage';
import { environment } from '@environments/environment';
import { LoginCredentials, RegisterCredentials } from '@models/features/authentication';
import { AnonymousSessionService } from './anonymous-session.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerSessionService {
  private readonly localStorageService = inject(LocalStorage);
  private readonly apiService = inject(ApiService);
  private readonly anonymousSessionService = inject(AnonymousSessionService);
  private accessToken = signal<string | null>(
    this.localStorageService.getValue<string>(environment.LOCAL_STORAGE_KEYS.accessToken),
  );
  private refreshToken = signal<string | null>(
    this.localStorageService.getValue<string>(environment.LOCAL_STORAGE_KEYS.refreshToken),
  );

  constructor() {
    effect(() => {
      this.localStorageService.setValue(
        environment.LOCAL_STORAGE_KEYS.accessToken,
        this.accessToken(),
      );
    });

    effect(() => {
      this.localStorageService.setValue(
        environment.LOCAL_STORAGE_KEYS.refreshToken,
        this.refreshToken(),
      );
    });
  }

  fetchAccessToken(credentials: LoginCredentials) {
    return this.apiService.customersTokenPost({
      body: new HttpParams({ fromObject: credentials }),
      headers: {
        Authorization: getBasicAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  login(credentials: LoginCredentials) {
    const anonymousToken = this.anonymousSessionService.getAccessToken();
    if (!anonymousToken) {
      throw new Error('Anonymous token not found');
    }
    return this.apiService.loginPost({
      queries: { ...credentials },
      headers: {
        Authorization: getBearerAuthHeader(anonymousToken),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  register(credentials: RegisterCredentials) {
    const anonymousAccessToken = this.anonymousSessionService.getAccessToken();
    const response = this.apiService.customersPost({
      body: JSON.stringify(credentials),
      headers: {
        Authorization: getBearerAuthHeader(anonymousAccessToken),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response;
  }

  logout() {
    // this.localStorageService.removeValue(environment.LOCAL_STORAGE_KEYS.accessToken);
    // this.localStorageService.removeValue(environment.LOCAL_STORAGE_KEYS.refreshToken);
    this.accessToken.set(null);
    this.refreshToken.set(null);
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
        const { access_token, refresh_token } = response;
        this.accessToken.set(access_token);
        this.refreshToken.set(refresh_token);
      });
  }

  getAccessToken() {
    return this.accessToken();
  }
}
