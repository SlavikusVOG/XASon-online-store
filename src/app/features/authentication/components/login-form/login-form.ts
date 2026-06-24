import { Component, output, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { PAGES } from '@core/router/pages.const';
import { Input, PasswordInput } from '@forms/signal';
import { LoginCredentials } from '@models/features/authentication';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'xas-login-form',
  imports: [FormRoot, Input, FormField, TuiButton, RouterLink, PasswordInput],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  public readonly PAGES = PAGES;

  private readonly INITIAL_LOGIN_MODEL: LoginCredentials = {
    email: '',
    password: '',
  };

  loginModel = signal<LoginCredentials>({ ...this.INITIAL_LOGIN_MODEL });

  loginForm = form(
    this.loginModel,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required.' });
      email(schemaPath.email, { message: 'Provide a valid email.' });

      required(schemaPath.password, { message: 'Password is required.' });
    },
    {
      submission: {
        action: async (form) => {
          this.loginSubmit.emit(form().value());
          return;
        },
      },
    },
  );

  loginSubmit = output<LoginCredentials>();

  clearForm(): void {
    this.loginForm().reset({ ...this.INITIAL_LOGIN_MODEL });
  }
}
