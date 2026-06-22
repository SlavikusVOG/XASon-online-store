import { provideHttpClient, withXhr } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '@core/router';
import { provideTaiga } from '@taiga-ui/core';
import { AUTH_SERVICE_TOKEN } from './tokens';
import { AuthService } from '@core/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withXhr()),
    provideRouter(routes, withComponentInputBinding()),
    provideTaiga(),
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService },
  ],
};
