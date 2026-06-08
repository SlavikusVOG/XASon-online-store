import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LoginForm } from '@features/authentication/components';
import { LoginCredentials } from '@models/features/authentication';

@Component({
  selector: 'xas-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
