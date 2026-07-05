import { HttpInterceptorFn } from '@angular/common/http';
import { errorInterceptor } from '@core/http/interceptors/error.interceptor';
import { offlineInterceptor } from '@core/http/interceptors/offline.interceptor';

export const INTERCEPTORS: HttpInterceptorFn[] = [errorInterceptor, offlineInterceptor];
