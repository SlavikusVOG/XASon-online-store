import { Injectable, inject } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { ApiService } from '../http/api.service';
import { environment } from '../../../environments/environment';
import { LoginCredentials } from '../../types/features/authentication/credentials.type';
import { RegisterCredentials } from '../../types/features/authentication/credentials.type';

@Injectable({
  providedIn: 'root',
})
export class CustomerSessionService {
  private readonly localStorageService = inject(LocalStorage);
  private readonly apiService = inject(ApiService);
  private readonly accessToken = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.accessToken,
  );
  private readonly refreshToken = this.localStorageService.getValue<string>(
    environment.LOCAL_STORAGE_KEYS.refreshToken,
  );

  login(credentials: LoginCredentials) {
    this.apiService.loginPost({
      // TODO: data binary
      body: credentials,
    });
  }

  register(credentials: RegisterCredentials) {
    // TODO: data binary
    this.apiService.customersPost({
      body: credentials,
    });
  }

  logout() {
    // TODO: implement logout
  }
}
