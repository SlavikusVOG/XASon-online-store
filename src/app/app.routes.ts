import { Routes } from '@angular/router';
import { LoginPage } from './features/authentication/pages/login-page/login-page';
import { RegistrationPage } from '../app/features/authentication/pages/registration-page/registration-page';
import { Catalog } from './features/catalog/pages/catalog/catalog';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegistrationPage,
  },
  {
    path: 'catalog',
    component: Catalog,
  },
];
