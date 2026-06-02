import { Component, inject } from '@angular/core';
import { RegistrationForm } from '../../../../shared/components/registration-form/registration-form';
import { CustomerSessionService } from '../../../../core/auth/customer-session.service';
import { RegisterCredentials } from '../../../../types/features/authentication/credentials.type';

@Component({
  selector: 'xas-registration-page',
  imports: [RegistrationForm],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
})
export class RegistrationPage {
  private readonly customerSessionService = inject(CustomerSessionService);
  onRegister(credentials: RegisterCredentials) {
    // TODO: implement
    this.customerSessionService.register(credentials);
  }
}
