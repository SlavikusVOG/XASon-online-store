import { Routes } from '@angular/router';
import { LoginPage } from './features/authentication/pages/login-page/login-page';
import { Catalog } from './features/catalog/pages/catalog/catalog';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'catalog',
    component: Catalog,
  },
];
