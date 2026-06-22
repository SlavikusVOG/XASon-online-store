import { Component, inject } from '@angular/core';
import { AuthService } from '@core/auth';
import { LoginForm } from '@features/authentication/components';
import { LoginCredentials } from '@models/features/authentication';

@Component({
  selector: 'xas-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private readonly authService = inject(AuthService);
  onLogin({ email, password }: LoginCredentials): void {
    if (!email || !password) {
      return;
    }
    this.authService.login({ email, password });
  }
}
