import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      error: async (errorResponse: HttpErrorResponse) => {
        // todo добавить обработку ошибок
        // для 401 - редиректить на страницу логина
        // для остальных отображать тост (+ добавить токен или ещё что-нибудь чтобы его наоборот не показывать (где он не нужен))
        return throwError(() => errorResponse);
      },
    }),
  );
};
