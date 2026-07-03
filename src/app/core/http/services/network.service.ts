import { inject, provideAppInitializer, Service, signal } from '@angular/core';
import { WA_WINDOW } from '@ng-web-apis/common';

@Service()
export class NetworkService {
  private readonly window = inject(WA_WINDOW);

  private readonly _isOffline = signal(false);

  public readonly isOffline = this._isOffline.asReadonly();

  public async init() {
    this.window.addEventListener('offline', () => {
      this._isOffline.set(true);
    });
    this.window.addEventListener('online', () => {
      this._isOffline.set(false);
    });
  }
}

export const provideNetwork = () => {
  return provideAppInitializer(() => {
    const networkService = inject(NetworkService);
    networkService.init();
  });
};
