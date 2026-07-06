import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AnonymousSessionService, CustomerSessionService } from '@core/auth';
import { AnonymousSessionAccessTokenPostResponse } from '@models/http';
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
  const anonymousToken = anonymousSessionService.getAccessToken();

  if (customerToken || anonymousToken) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${customerToken || anonymousToken}`),
    });
    return next(clonedReq);
  }

  return anonymousSessionService
    .fetchAccessToken(anonymousSessionService.getAnonymousId() ?? '')
    .pipe(
      switchMap((response: AnonymousSessionAccessTokenPostResponse) => {
        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${response.access_token}`),
        });
        return next(clonedReq);
      }),
    );
};
