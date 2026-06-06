import { Component } from '@angular/core';
import { LoginCredentials } from '@models/features/authentication';
import { LoginForm } from '@shared/components';

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
