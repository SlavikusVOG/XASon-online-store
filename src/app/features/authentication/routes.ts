import { Routes } from '@angular/router';

export const loginRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/login-page/login-page').then((c) => c.LoginPage),
  },
];

export const registerRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/registration-page/registration-page').then((c) => c.RegistrationPage),
  },
];
