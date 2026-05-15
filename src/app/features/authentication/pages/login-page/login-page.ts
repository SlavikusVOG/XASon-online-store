import { Component } from '@angular/core';
import { LoginForm } from '../../../../shared/components/login-form/login-form';

@Component({
  selector: 'xas-login-page',
  imports: [LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  onLogin(): void {
    // TODO: login user
  }
}
