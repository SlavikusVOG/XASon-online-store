import { inject, Service } from '@angular/core';
import { TuiNotificationService } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';

type ToastAppearance = 'info' | 'warning' | 'negative' | 'positive' | 'neutral';

@Service()
export class ToastService {
  private readonly _notificationService = inject(TuiNotificationService);

  private readonly _closeAllToasts = new Subject<void>();

  public showInfoToast(text: string): void {
    return this.showToast(text, 'info');
  }

  public showErrorToast(text: string): void {
    return this.showToast(text, 'negative');
  }

  public showSuccessToast(text: string): void {
    return this.showToast(text, 'positive');
  }

  public closeToasts(): void {
    this._closeAllToasts.next();
  }

  private showToast(text: string, appearance: ToastAppearance): void {
    this._notificationService
      .open(text, {
        appearance,
        autoClose: 3_000,
        block: 'start',
        inline: 'center',
      })
      .pipe(takeUntil(this._closeAllToasts))
      .subscribe();
  }
}
