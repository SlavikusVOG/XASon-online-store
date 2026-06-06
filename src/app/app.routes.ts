import { Routes } from '@angular/router';
import { AuthLayout, MainLayout } from './core/layouts';
import { LoginPage, RegistrationPage } from './features/authentication';
import { Catalog, CatalogStore } from './features/catalog';
import { UserProfilePage } from './features/user-profile';
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
      { path: 'catalog', component: Catalog, providers: [CatalogStore] },
      { path: 'userprofile', component: UserProfilePage },
      { path: 'cart', component: CartPage },
    ],
  },
];
