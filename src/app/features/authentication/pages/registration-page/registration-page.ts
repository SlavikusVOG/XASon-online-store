import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PAGES } from '@core/router/pages.const';
import { RegistrationForm } from '@features/authentication/components';
import { RegisterCredentials } from '@models/features/authentication';
import { AUTH_SERVICE_TOKEN } from '../../../../tokens';
import { ToastService } from '@shared/services';

@Component({
  selector: 'xas-registration-page',
  imports: [RegistrationForm, RouterLink],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
})
export class RegistrationPage {
  protected readonly toastService = inject(ToastService);
  protected readonly PAGES = PAGES;
  private readonly authService = inject(AUTH_SERVICE_TOKEN);
  private readonly router = inject(Router);
  onRegister(credentials: RegisterCredentials) {
    return this.authService.register(credentials).subscribe({
      next: (response) => {
        if (response.customer.id) {
          this.toastService.showSuccessToast('Registration successful');
          this.router.navigate(['/login']);
        } else {
          this.toastService.showErrorToast('Failed to register');
        }
      },
      error: (error) => {
        const message =
          error.error?.message ?? error.message ?? 'Registration failed. Please try again.';
        this.toastService.showErrorToast(message);
      },
    });
  }
}
