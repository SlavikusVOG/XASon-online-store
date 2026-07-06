import { provideHttpClient, withInterceptors, withXhr } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AuthService } from '@core/auth';
import { INTERCEPTORS, provideNetwork } from '@core/http';
import { routes } from '@core/router';
import { provideTaiga } from '@taiga-ui/core';
import { AUTH_SERVICE_TOKEN } from './tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withXhr(), withInterceptors(INTERCEPTORS)),
    provideRouter(routes, withComponentInputBinding()),
    provideTaiga(),
    provideNetwork(),
    { provide: AUTH_SERVICE_TOKEN, useClass: AuthService },
  ],
};
