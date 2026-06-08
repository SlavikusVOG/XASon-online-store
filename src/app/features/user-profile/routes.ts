import { Routes } from '@angular/router';

export const userProfileRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/user-profile-page/user-profile-page').then((c) => c.UserProfilePage),
  },
];
