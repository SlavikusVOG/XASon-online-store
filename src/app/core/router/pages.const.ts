import { createPage } from './pages.utils';

export const PAGES = {
  LOGIN: createPage(['login']),
  REGISTER: createPage(['register']),

  CATALOG: createPage(['catalog']),

  CART: createPage(['cart']),

  PROFILE: createPage(['profile']),

  ABOUT_US: createPage(['about-us']),

  HOME: createPage(['']),
  HOME_FULL: createPage(['home']),

  NOT_FOUND: createPage(['not-found']),
} as const;
