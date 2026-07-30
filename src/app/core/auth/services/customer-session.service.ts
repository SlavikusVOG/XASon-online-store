import { HttpParams } from '@angular/common/http';
import { Injectable, inject, signal, effect } from '@angular/core';
import { ApiService } from '@core/http';
import { LocalStorage } from '@core/local-storage';
import { environment } from '@environments/environment';
import { LoginCredentials, RegisterCredentials } from '@models/features/authentication';
import { AnonymousSessionService } from './anonymous-session.service';
import { map, Observable, of, tap } from 'rxjs';
import { LoginPostResponse } from '@models/http';
import {
  CustomerAddress,
  CustomerGetResponse,
  CustomerUpdateAction,
} from '@models/http/request/me.type';
import { Address, PersonalInfoUpdate, ProcessedUser } from '@models/features/user-profile';

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
  private user = signal<ProcessedUser | null>(
    this.localStorageService.getValue<ProcessedUser | null>(environment.LOCAL_STORAGE_KEYS.user),
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
      this.localStorageService.setValue<ProcessedUser | null>(
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

  getUser(): Observable<ProcessedUser> {
    return this.apiService
      .getMe({
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((user): ProcessedUser => {
          const processedUserInfo = this.processUserInfo(user);
          this.user.set(processedUserInfo);
          return processedUserInfo;
        }),
      );
  }

  updateUser(updates: PersonalInfoUpdate): Observable<ProcessedUser> {
    const currentUser = this.user();
    if (!currentUser) {
      throw new Error('No user loaded');
    }

    const actions = this.buildPersonalInfoActions(currentUser, updates);
    if (actions.length === 0) {
      return of(currentUser);
    }

    return this.apiService
      .updateMe({
        body: {
          version: currentUser.version,
          actions,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((customer): ProcessedUser => {
          const processedUser = this.processUserInfo(customer);
          this.user.set(processedUser);
          return processedUser;
        }),
      );
  }

  getAccessToken() {
    return this.accessToken();
  }

  processUserInfo(customer: CustomerGetResponse): ProcessedUser {
    const address = this.processAddress(customer.addresses);
    return {
      id: customer.id,
      version: customer.version,
      address,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateOfBirth: customer.dateOfBirth ? this.parseDateOfBirth(customer.dateOfBirth) : null,
      street: address?.streetName ?? '',
      city: address?.city ?? '',
      postalCode: address?.postalCode ?? '',
      country: address?.country ?? '',
    };
  }

  processAddress(addresses: CustomerAddress[]): Address | null {
    const addr = addresses[0];
    if (!addr) {
      return null;
    }

    return {
      id: addr.id,
      key: addr.key,
      title: addr.title,
      firstName: addr.firstName,
      lastName: addr.lastName,
      streetName: addr.streetName,
      streetNumber: addr.streetNumber,
      postalCode: addr.postalCode,
      city: addr.city,
      country: addr.country,
      phone: addr.phone,
      mobile: addr.mobile,
      email: addr.email,
    };
  }

  private buildPersonalInfoActions(
    current: ProcessedUser,
    updates: PersonalInfoUpdate,
  ): CustomerUpdateAction[] {
    const actions: CustomerUpdateAction[] = [];

    if (updates.firstName !== current.firstName) {
      actions.push({ action: 'setFirstName', firstName: updates.firstName });
    }

    if (updates.lastName !== current.lastName) {
      actions.push({ action: 'setLastName', lastName: updates.lastName });
    }

    const currentDob = this.toDateOfBirthString(current.dateOfBirth);
    const nextDob = this.toDateOfBirthString(updates.dateOfBirth);
    if (nextDob !== currentDob) {
      actions.push({
        action: 'setDateOfBirth',
        ...(nextDob ? { dateOfBirth: nextDob } : {}),
      });
    }

    return actions;
  }

  private toDateOfBirthString(date: Date | null): string | undefined {
    if (!date || Number.isNaN(date.getTime())) {
      return undefined;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseDateOfBirth(value: string): Date | null {
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) {
      return null;
    }

    return new Date(year, month - 1, day);
  }
}
