import { HttpInterceptorFn } from '@angular/common/http';
import { errorInterceptor } from '@core/http/interceptors/error.interceptor';
import { offlineInterceptor } from '@core/http/interceptors/offline.interceptor';
import { authTokenInterceptor } from './auth-token.interceptor';

export const INTERCEPTORS: HttpInterceptorFn[] = [
  authTokenInterceptor,
  errorInterceptor,
  offlineInterceptor,
];
