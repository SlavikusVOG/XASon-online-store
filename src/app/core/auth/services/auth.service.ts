import { inject, Injectable } from '@angular/core';
import { LoginCredentials, RegisterCredentials } from '@models/features/authentication';
import { CustomerSessionService } from './customer-session.service';
import { AnonymousSessionService } from './anonymous-session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly customerSessionService = inject(CustomerSessionService);
  private readonly anonymousSessionService = inject(AnonymousSessionService);

  constructor() {
    this.ensureAnonymousToken();
  }

  isAuthenticated() {
    return this.customerSessionService.getAccessToken() !== null;
  }

  login(credentials: LoginCredentials) {
    return this.customerSessionService.login(credentials);
  }

  register(credentials: RegisterCredentials) {
    const response = this.customerSessionService.register(credentials);
    return response;
  }

  private ensureAnonymousToken() {
    if (!this.isAuthenticated()) {
      this.anonymousSessionService.ensureAccessToken();
    }
  }
}
