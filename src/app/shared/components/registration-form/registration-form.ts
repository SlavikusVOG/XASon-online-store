import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReactiveFormInput } from '../reactive-form-input/reactive-form-input';

@Component({
  selector: 'xas-registration-form',
  imports: [ReactiveFormsModule, ReactiveFormInput],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.scss',
})
export class RegistrationForm {
  protected readonly registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });
}
