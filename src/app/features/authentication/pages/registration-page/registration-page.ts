import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/auth';
import { RegisterCredentials } from '@models/features/authentication';
import { RegistrationForm } from '@shared/components';

@Component({
  selector: 'xas-registration-page',
  imports: [RegistrationForm, RouterLink],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
})
export class RegistrationPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  onRegister(credentials: RegisterCredentials) {
    this.authService.register(credentials).subscribe((response) => {
      if (response.id) {
        this.router.navigate(['/login']);
      } else {
        alert('Failed to register');
      }
    });
  }
}
