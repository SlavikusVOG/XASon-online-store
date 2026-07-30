import { Component, effect, inject, input, output, signal, untracked } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalInfoUpdate, ProcessedUser } from '@models/features/user-profile';
import { ReactiveInput } from '@shared/forms/reactive/components';
import { ToastService } from '@shared/services';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'xas-personal-information',
  imports: [ReactiveFormsModule, ReactiveInput, TuiButton, TuiIcon, TuiCardLarge, TuiAvatar],
  templateUrl: './personal-information.html',
  styleUrl: './personal-information.scss',
})
export class PersonalInformation {
  private readonly toastService = inject(ToastService);

  readonly user = input.required<ProcessedUser>();
  readonly isSaving = input(false);
  readonly save = output<PersonalInfoUpdate>();

  protected editForm = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl<string | null>(null, []),
    street: new FormControl('', []),
    city: new FormControl('', []),
    postalCode: new FormControl('', []),
    country: new FormControl('', []),
  });

  protected readonly _isEditMode = signal(false);
  protected readonly isEditMode = this._isEditMode.asReadonly();

  private readonly lastSyncedVersion = signal<number | null>(null);

  protected readonly inputFields = [
    {
      label: 'Email',
      control: this.editForm.controls.email,
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      label: 'First Name',
      control: this.editForm.controls.firstName,
      type: 'text',
      placeholder: 'Enter your first name',
    },
    {
      label: 'Last Name',
      control: this.editForm.controls.lastName,
      type: 'text',
      placeholder: 'Enter your last name',
    },
    {
      label: 'Date of Birth',
      control: this.editForm.controls.dateOfBirth,
      type: 'date',
      placeholder: 'Enter your date of birth',
    },
    {
      label: 'Street',
      control: this.editForm.controls.street,
      type: 'text',
      placeholder: 'Enter your street',
    },
    {
      label: 'City',
      control: this.editForm.controls.city,
      type: 'text',
      placeholder: 'Enter your city',
    },
    {
      label: 'Postal Code',
      control: this.editForm.controls.postalCode,
      type: 'text',
      placeholder: 'Enter your postal code',
    },
    {
      label: 'Country',
      control: this.editForm.controls.country,
      type: 'text',
      placeholder: 'Enter your country',
    },
  ];

  constructor() {
    effect(() => {
      const currentUser = this.user();
      if (this.lastSyncedVersion() === currentUser.version) {
        return;
      }

      untracked(() => {
        this.lastSyncedVersion.set(currentUser.version);
        this.patchFormFromUser(currentUser);
        this._isEditMode.set(false);
      });
    });
  }

  toggleEditMode() {
    if (this._isEditMode()) {
      this.patchFormFromUser(this.user());
    }
    this._isEditMode.update((v) => !v);
  }

  saveChanges() {
    if (this.editForm.invalid) {
      this.toastService.showErrorToast('Please fill in all fields');
      return;
    }

    if (this.isSaving()) {
      return;
    }

    const { firstName, lastName, dateOfBirth } = this.editForm.getRawValue();
    this.save.emit({
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      dateOfBirth: this.parseDateOfBirth(dateOfBirth),
    });
  }

  private patchFormFromUser(currentUser: ProcessedUser) {
    this.editForm.patchValue({
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      dateOfBirth: this.toDateInputValue(currentUser.dateOfBirth),
      street: currentUser.street,
      city: currentUser.city,
      postalCode: currentUser.postalCode,
      country: currentUser.country,
    });
    this.editForm.controls.email.disable();
  }

  private toDateInputValue(date: Date | null): string | null {
    if (!date || Number.isNaN(date.getTime())) {
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private parseDateOfBirth(value: string | null): Date | null {
    if (!value) {
      return null;
    }

    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) {
      return null;
    }

    return new Date(year, month - 1, day);
  }
}
