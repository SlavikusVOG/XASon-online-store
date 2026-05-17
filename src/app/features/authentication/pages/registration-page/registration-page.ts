import { Component } from '@angular/core';
import { RegistrationForm } from '../../../../shared/components/registration-form/registration-form';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xas-registration-page',
  imports: [RegistrationForm],
  templateUrl: './registration-page.html',
  styleUrl: './registration-page.scss',
})
export class RegistrationPage {
  protected readonly registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
}
