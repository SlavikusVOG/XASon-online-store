import { HttpParams } from '@angular/common/http';
import { Injectable, inject, signal, effect } from '@angular/core';
import { ApiService } from '@core/http';
import { LocalStorage } from '@core/local-storage';
import { environment } from '@environments/environment';
import { LoginCredentials, RegisterCredentials } from '@models/features/authentication';
import { AnonymousSessionService } from './anonymous-session.service';
import { Observable, tap } from 'rxjs';
import { LoginPostResponse, User } from '@models/http';
import { CustomerGetResponse } from '@models/http/request/me.type';

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
  private user = signal<User | null>(
    this.localStorageService.getValue<User | null>(environment.LOCAL_STORAGE_KEYS.user),
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

    effect(() => {
      this.localStorageService.setValue<User | null>(
        environment.LOCAL_STORAGE_KEYS.user,
        this.user(),
      );
    });
  }

  fetchAccessToken(credentials: LoginCredentials) {
    return this.apiService.customersTokenPost({
      body: new HttpParams({ fromObject: credentials }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  login(credentials: LoginCredentials): Observable<LoginPostResponse> {
    return this.apiService
      .loginPost({
        body: { ...credentials },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((user) => {
          this.accessToken.set(user.access_token);
          this.refreshToken.set(user.refresh_token);
          this.loadProfile();
        }),
      );
  }

  register(credentials: RegisterCredentials) {
    const response = this.apiService.customersPost({
      body: new HttpParams({ fromObject: credentials }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response;
  }

  logout() {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.user.set(null);
  }

  refreshAccessToken() {
    this.apiService
      .refreshTokenPost({
        body: {
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken() ?? '',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe((response) => {
        const { access_token, refresh_token } = response;
        this.accessToken.set(access_token);
        this.refreshToken.set(refresh_token);
      });
  }

  loadProfile() {
    this.apiService
      .getMe({
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((user) => {
          const processedUserInfo = this.processUserInfo(user);
          this.user.set(processedUserInfo);
        }),
      );
  }

  getUser() {
    return this.user();
  }

  getAccessToken() {
    return this.accessToken();
  }

  processUserInfo(customer: CustomerGetResponse): User {
    return {
      id: customer.id,
      addresses: customer.addresses,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
    };
  }
}
