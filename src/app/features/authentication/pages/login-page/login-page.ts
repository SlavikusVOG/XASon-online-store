import { Component } from '@angular/core';
import { LoginCredentials, LoginForm } from '../../../../shared/components/login-form/login-form';

@Component({
  selector: 'xas-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  onLogin({ email, password }: LoginCredentials): void {
    if (!email || !password) {
      return;
    }
    // TODO: call auth service
  }
}
