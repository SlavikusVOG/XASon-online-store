import { Injectable, inject } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { ApiService } from '../http/api.service';
import { environment } from '../../../environments/environment';
import { LoginCredentials } from '../../types/features/authentication/credentials.type';
import { RegisterCredentials } from '../../types/features/authentication/credentials.type';
import { getBasicAuthHeader, getBearerAuthHeader } from '../http/api.utils';
import { AnonymousSessionService } from './anonymous-session.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerSessionService {
  private readonly localStorageService = inject(LocalStorage);
  private readonly apiService = inject(ApiService);
  private readonly anonymousSessionService = inject(AnonymousSessionService);
  private accessToken = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.accessToken,
  );
  private refreshToken = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.refreshToken,
  );

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
    this.apiService.customersPost({
      queries: { ...credentials },
      headers: {
        Authorization: getBasicAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  logout() {
    this.localStorageService.removeValue(environment.LOCAL_STORAGE_KEYS.accessToken);
    this.localStorageService.removeValue(environment.LOCAL_STORAGE_KEYS.refreshToken);
    this.accessToken = null;
    this.refreshToken = null;
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
        const { access_token, refresh_token } = response;
        this.localStorageService.setValue(environment.LOCAL_STORAGE_KEYS.accessToken, access_token);
        this.localStorageService.setValue(
          environment.LOCAL_STORAGE_KEYS.refreshToken,
          refresh_token,
        );
        this.accessToken = access_token;
        this.refreshToken = refresh_token;
      });
  }

  getAccessToken() {
    return this.accessToken;
  }
}
