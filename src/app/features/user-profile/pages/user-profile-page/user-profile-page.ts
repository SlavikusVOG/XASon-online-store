import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonalInformation } from '@features/user-profile/components';
import { ProcessedUser } from '@models/features/user-profile';
import { DATA_LOAD_STATUSES, DataLoadStatus } from '@shared/const';
import { CustomerSessionService } from '@core/auth';
import { TuiLoader } from '@taiga-ui/core';
import { ToastService } from '@shared/services';

@Component({
  selector: 'xas-user-profile-page',
  imports: [PersonalInformation, TuiLoader],
  templateUrl: './user-profile-page.html',
  styleUrl: './user-profile-page.scss',
})
export class UserProfilePage implements OnInit {
  private readonly customerSessionService = inject(CustomerSessionService);
  private readonly toastService = inject(ToastService);

  protected readonly DATA_LOAD_STATUSES = DATA_LOAD_STATUSES;
  protected readonly loadStatus = signal<DataLoadStatus>(DATA_LOAD_STATUSES.INIT);
  protected readonly user = signal<ProcessedUser | null>(null);

  async ngOnInit(): Promise<void> {
    this.loadStatus.set(DATA_LOAD_STATUSES.LOADING);
    this.customerSessionService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);
        this.loadStatus.set(DATA_LOAD_STATUSES.WITH_DATA);
      },
      error: (error) => {
        const message = error.error.message ?? error.message ?? 'Failed to load Profile';
        this.showErrorMessage(message);
        this.loadStatus.set(DATA_LOAD_STATUSES.ERROR);
      },
    });
  }

  protected showErrorMessage(message: string) {
    this.toastService.showErrorToast(message);
  }
}
