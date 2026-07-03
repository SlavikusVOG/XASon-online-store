import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NetworkService } from '@core/http/services/network.service';
import { ToastService } from '@shared/services';
import { EMPTY } from 'rxjs';

export const offlineInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const networkService = inject(NetworkService);

  if (networkService.isOffline()) {
    toastService.showErrorToast('You are offline. Connect to Internet to proceed');
    return EMPTY;
  }

  return next(req);
};
