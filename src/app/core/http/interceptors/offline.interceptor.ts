import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NetworkService } from '@core/http/services/network.service';
import { EMPTY } from 'rxjs';

export const offlineInterceptor: HttpInterceptorFn = (req, next) => {
  const networkService = inject(NetworkService);

  if (networkService.isOffline()) {
    // todo тут вместо алерта сделать тост
    alert('You are offline.');
    return EMPTY;
  }

  return next(req);
};
