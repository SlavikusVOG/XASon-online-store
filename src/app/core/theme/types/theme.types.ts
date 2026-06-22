import { ToValues } from '@shared/utils';

export const Themes = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  SYSTEM: 'SYSTEM',
} as const;

export type Theme = ToValues<typeof Themes>;
