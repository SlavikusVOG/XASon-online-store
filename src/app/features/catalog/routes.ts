import { Routes } from '@angular/router';
import { CatalogStore } from '@features/catalog/store';

export const catalogRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/catalog/catalog').then((c) => c.Catalog),
    providers: [CatalogStore],
  },
];
