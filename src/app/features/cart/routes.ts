import { Routes } from '@angular/router';
import { CartStore } from '@features/cart/store';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/cart-page/cart-page').then((c) => c.CartPage),
    providers: [CartStore],
  },
];
