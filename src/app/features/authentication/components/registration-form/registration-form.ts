import { Component, DestroyRef, inject, output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterCredentials } from '@models/features/authentication';
import { ReactiveInput } from '@shared/forms/reactive/components';
import { TuiButton } from '@taiga-ui/core';
import { PAGES } from '@core/router/pages.const';
import { RouterLink } from '@angular/router';
import { ReactivePasswordInput } from '@shared/forms/reactive/components';
import { ValidationError } from '@angular/forms/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'xas-registration-form',
  imports: [ReactiveFormsModule, ReactiveInput, TuiButton, RouterLink, ReactivePasswordInput],
  templateUrl: './registration-form.html',
  // TODO: standardize styles
  styleUrl: './registration-form.scss',
})
export class RegistrationForm {
  protected readonly PAGES = PAGES;
  protected readonly register = output<RegisterCredentials>();
  protected readonly registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      passwordMatchValidator,
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    // TODO: move to user profile page
    // dateOfBirth: new FormControl('', [Validators.required]),
    // street: new FormControl('', [Validators.required]),
    // city: new FormControl('', [Validators.required]),
    // postalCode: new FormControl('', [Validators.required]),
    // country: new FormControl('', [Validators.required]),
  });
  protected readonly fields = [
    {
      label: 'Email',
      control: this.registrationForm.controls.email,
      type: 'email',
      placeholder: 'Enter your email',
      validators: [Validators.required, Validators.email],
      errorMessage: 'Email is required',
    },
    {
      label: 'Password',
      control: this.registrationForm.controls.password,
      type: 'password',
      placeholder: 'Enter your password',
      validators: [Validators.required, Validators.minLength(8)],
      errorMessage: 'Password is required',
    },
    {
      label: 'Confirm Password',
      control: this.registrationForm.controls.confirmPassword,
      type: 'password',
      placeholder: 'Confirm your password',
      validators: [Validators.required, Validators.minLength(8)],
      errorMessage: 'Confirm Password is required',
    },
    {
      label: 'First Name',
      control: this.registrationForm.controls.firstName,
      type: 'text',
      placeholder: 'Enter your first name',
      validators: [Validators.required],
      errorMessage: 'First Name is required',
    },
    {
      label: 'Last Name',
      control: this.registrationForm.controls.lastName,
      type: 'text',
      placeholder: 'Enter your last name',
      validators: [Validators.required],
      errorMessage: 'Last Name is required',
    },
    // TODO: move to user profile page
    // {
    //   label: 'Date of Birth',
    //   control: this.registrationForm.controls.dateOfBirth,
    //   type: 'date',
    //   placeholder: 'Enter your date of birth',
    //   validators: [Validators.required],
    //   errorMessage: 'Date of Birth is required',
    // },
    // {
    //   label: 'Street',
    //   control: this.registrationForm.controls.street,
    //   type: 'text',
    //   placeholder: 'Enter your street',
    //   validators: [Validators.required],
    //   errorMessage: 'Street is required',
    // },
    // {
    //   label: 'City',
    //   control: this.registrationForm.controls.city,
    //   type: 'text',
    //   placeholder: 'Enter your city',
    //   validators: [Validators.required],
    //   errorMessage: 'City is required',
    // },
    // {
    //   label: 'Postal Code',
    //   control: this.registrationForm.controls.postalCode,
    //   type: 'text',
    //   placeholder: 'Enter your postal code',
    //   validators: [Validators.required],
    //   errorMessage: 'Postal Code is required',
    // },
    // {
    //   label: 'Country',
    //   control: this.registrationForm.controls.country,
    //   type: 'text',
    //   placeholder: 'Enter your country',
    //   validators: [Validators.required],
    //   errorMessage: 'Country is required',
    // },
  ];

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.registrationForm.controls.password.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.registrationForm.controls.confirmPassword.updateValueAndValidity({
          emitEvent: false,
        });
      });
  }
  onSubmit() {
    if (this.registrationForm.valid) {
      const { email, password, firstName, lastName } = this.registrationForm.value;
      const credentials: RegisterCredentials = {
        email: email ?? '',
        password: password ?? '',
        firstName: firstName ?? '',
        lastName: lastName ?? '',
      };
      this.register.emit(credentials);
    } else {
      this.registrationForm.markAllAsDirty();
      this.registrationForm.markAllAsTouched();
    }
  }

  clearForm(): void {
    this.registrationForm.reset();
  }
}

function passwordMatchValidator(control: AbstractControl): ValidationError | null {
  const confirmPassword = control.value;
  const password = control.parent?.get('password')?.value;
  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : {
        message: 'Passwords do not match',
        kind: 'passwordMatch',
      };
}
