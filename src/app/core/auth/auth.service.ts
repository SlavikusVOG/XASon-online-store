import { inject, Injectable } from '@angular/core';
import { CustomerSessionService } from './customer-session.service';
import {
  LoginCredentials,
  RegisterCredentials,
} from '../../types/features/authentication/credentials.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly customerSessionService = inject(CustomerSessionService);

  private accessToken = this.customerSessionService.getAccessToken();

  isAuthenticated() {
    return this.accessToken !== null;
  }

  login(credentials: LoginCredentials) {
    this.customerSessionService.login(credentials);
    this.accessToken = this.customerSessionService.getAccessToken();
  }

  register(credentials: RegisterCredentials) {
    this.customerSessionService.register(credentials);
  }
}
