import { Routes } from '@angular/router';
import { CatalogStore } from '@features/catalog/store';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page').then((c) => c.HomePage),
    providers: [CatalogStore],
  },
];
