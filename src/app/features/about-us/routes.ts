import { Routes } from '@angular/router';

export const aboutUsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/about-us-page/about-us-page').then((c) => c.AboutUsPage),
  },
];
