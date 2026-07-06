import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth';
import { PAGES } from '@core/router/pages.const';
import { LoginForm } from '@features/authentication/components';
import { LoginCredentials } from '@models/features/authentication';
import { ToastService } from '@shared/services';

@Component({
  selector: 'xas-login-page',
  imports: [LoginForm, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  protected readonly PAGES = PAGES;
  private router = inject(Router);
  protected readonly toastService = inject(ToastService);

  private readonly authService = inject(AuthService);

  onLogin({ email, password }: LoginCredentials): void {
    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        const message = err.error?.message ?? err.message ?? 'Login failed. Please try again.';
        this.toastService.showErrorToast(message);
      },
    });
  }
}
