import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { LoginPage } from './features/authentication/pages/login-page/login-page';
import { Catalog } from './features/catalog/pages/catalog/catalog';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [{ path: 'login', component: LoginPage }],
  },
  {
    path: '',
    component: MainLayout,
    children: [{ path: 'catalog', component: Catalog }],
  },
];
