import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { LoginPage } from './features/authentication/pages/login-page/login-page';
import { RegistrationPage } from '../app/features/authentication/pages/registration-page/registration-page';
import { Catalog } from './features/catalog/pages/catalog/catalog';
import { HomePage } from './features/home/pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'catalog', component: Catalog },
    ],
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegistrationPage },
    ],
  },
];
