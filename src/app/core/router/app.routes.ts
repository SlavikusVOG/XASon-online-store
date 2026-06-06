import { Routes } from '@angular/router';
import { AuthLayout, MainLayout } from '@core/layouts';
import { PAGES } from '@core/router/pages.const';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    loadChildren: () => [
      {
        path: PAGES.LOGIN.name,
        loadChildren: () => import('@features/authentication/routes').then((r) => r.loginRoutes),
      },
      {
        path: PAGES.REGISTER.name,
        loadChildren: () => import('@features/authentication/routes').then((r) => r.registerRoutes),
      },
    ],
  },
  {
    path: '',
    component: MainLayout,
    loadChildren: () => [
      {
        path: PAGES.CART.name,
        loadChildren: () => import('@features/cart/routes').then((r) => r.cartRoutes),
      },
      {
        path: PAGES.CATALOG.name,
        loadChildren: () => import('@features/catalog/routes').then((r) => r.catalogRoutes),
      },
      {
        path: PAGES.PROFILE.name,
        loadChildren: () =>
          import('@features/user-profile/routes').then((r) => r.userProfileRoutes),
      },
    ],
  },
];
