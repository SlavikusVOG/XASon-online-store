import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AnonymousSessionService, CustomerSessionService } from '@core/auth';
import { switchMap } from 'rxjs';

const SKIP_PATHS = ['/auth/anonymous'];

function shouldSkipPath(req: HttpRequest<unknown>): boolean {
  return SKIP_PATHS.some((path) => req.url.includes(path));
}

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (shouldSkipPath(req)) {
    return next(req);
  }

  const customerSessionService = inject(CustomerSessionService);
  const anonymousSessionService = inject(AnonymousSessionService);

  const customerToken = customerSessionService.getAccessToken();
  if (customerToken) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${customerToken}`),
    });
    return next(clonedReq);
  }

  return anonymousSessionService.ensureAccessToken().pipe(
    switchMap((token) => {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next(clonedReq);
    }),
  );
};
