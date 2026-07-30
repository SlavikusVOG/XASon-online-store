import { Component, inject, OnInit, signal } from '@angular/core';
import { PersonalInformation } from '@features/user-profile/components';
import { PersonalInfoUpdate, ProcessedUser } from '@models/features/user-profile';
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
  protected readonly isSaving = signal(false);

  ngOnInit(): void {
    this.loadStatus.set(DATA_LOAD_STATUSES.LOADING);
    this.customerSessionService.getUser().subscribe({
      next: (user) => {
        this.user.set(user);
        this.loadStatus.set(DATA_LOAD_STATUSES.WITH_DATA);
      },
      error: (error: { error?: { message?: string }; message?: string }) => {
        const message = error.error?.message ?? error.message ?? 'Failed to load Profile';
        this.showErrorMessage(message);
        this.loadStatus.set(DATA_LOAD_STATUSES.ERROR);
      },
    });
  }

  protected onSavePersonalInfo(updates: PersonalInfoUpdate): void {
    if (this.isSaving()) {
      return;
    }

    this.isSaving.set(true);
    this.customerSessionService.updateUser(updates).subscribe({
      next: (updatedUser) => {
        this.user.set(updatedUser);
        this.toastService.showSuccessToast('Profile updated successfully');
        this.isSaving.set(false);
      },
      error: (error: { error?: { message?: string }; message?: string }) => {
        const message = error.error?.message ?? error.message ?? 'Failed to update profile';
        this.showErrorMessage(message);
        this.isSaving.set(false);
      },
    });
  }

  protected showErrorMessage(message: string) {
    this.toastService.showErrorToast(message);
  }
}
