import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { FormInput } from '../form-input/form-input';

@Component({
  selector: 'xas-login-form',
  imports: [FormInput],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginForm {
  private readonly INITIAL_LOGIN_MODEL = {
    email: '',
    password: '',
  };
  loginModel = signal({ ...this.INITIAL_LOGIN_MODEL });
  loginForm = form(this.loginModel);
  clearForm(): void {
    this.loginForm().reset({
      ...this.INITIAL_LOGIN_MODEL,
    });
  }
}
