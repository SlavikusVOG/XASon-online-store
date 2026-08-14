import { inject, Injectable } from '@angular/core';
import { LoginCredentials, RegisterCredentials } from '@models/features/authentication';
import { CustomerSessionService } from './customer-session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly customerSessionService = inject(CustomerSessionService);

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
}
