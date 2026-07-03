import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth';
import { PAGES } from '@core/router/pages.const';
import { LoginForm } from '@features/authentication/components';
import { LoginCredentials } from '@models/features/authentication';

@Component({
  selector: 'xas-login-page',
  imports: [LoginForm, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  protected readonly PAGES = PAGES;

  private readonly authService = inject(AuthService);

  onLogin({ email, password }: LoginCredentials): void {
    this.authService.login({ email, password });
  }
}
