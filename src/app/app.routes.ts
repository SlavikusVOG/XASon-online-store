import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { LoginPage } from './features/authentication/pages/login-page/login-page';
import { RegistrationPage } from '../app/features/authentication/pages/registration-page/registration-page';
import { Catalog } from './features/catalog/pages/catalog/catalog';
import { UserProfilePage } from './features/user-profile/pages/user-profile-page/user-profile-page';
import { CartPage } from './features/cart/pages/cart-page/cart-page';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegistrationPage },
    ],
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'catalog', component: Catalog },
      { path: 'userprofile', component: UserProfilePage },
      { path: 'cart', component: CartPage },
    ],
  },
];
