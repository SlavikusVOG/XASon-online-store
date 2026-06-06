import { Component, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { FormInput } from '../form-input/form-input';
import { LoginCredentials } from '../../../types/features/authentication/credentials.type';

@Component({
  selector: 'xas-login-form',
  imports: [FormInput],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private readonly INITIAL_LOGIN_MODEL: LoginCredentials = {
    email: '',
    password: '',
  };
  loginModel = signal({ ...this.INITIAL_LOGIN_MODEL });
  loginForm = form(this.loginModel);
  loginSubmit = output<LoginCredentials>();

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    this.loginSubmit.emit(this.loginModel());
  }

  clearForm(): void {
    this.loginForm().reset({
      ...this.INITIAL_LOGIN_MODEL,
    });
  }
}
