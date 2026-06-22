import { Component, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { LoginCredentials } from '@models/features/authentication';
import { SignalFormInput } from '@shared/components/signal-form/form-input/form-input';

@Component({
  selector: 'xas-login-form',
  imports: [SignalFormInput],
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
