import { Component } from '@angular/core';
import { LoginForm } from '../../../../shared/components/login-form/login-form';
import { LoginCredentials } from '../../../../types/features/authentication/credentials.type';

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
