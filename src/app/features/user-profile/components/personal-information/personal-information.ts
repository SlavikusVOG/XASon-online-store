import { Component, OnInit, inject, model, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProcessedUser } from '@models/features/user-profile';
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
export class PersonalInformation implements OnInit {
  private readonly toastService = inject(ToastService);
  readonly user = model.required<ProcessedUser>();

  protected editForm = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl(new Date(), []),
    street: new FormControl('', []),
    city: new FormControl('', []),
    postalCode: new FormControl('', []),
    country: new FormControl('', []),
  });
  protected readonly _isEditMode = signal(false);
  protected readonly isEditMode = this._isEditMode.asReadonly();

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

  ngOnInit() {
    this.editForm.patchValue({
      email: this.user().email,
      firstName: this.user().firstName,
      lastName: this.user().lastName,
      dateOfBirth: this.user().dateOfBirth,
      street: this.user().street,
      city: this.user().city,
    });
    this.editForm.controls.email.disable();
  }

  toggleEditMode() {
    this._isEditMode.update((v) => !v);
  }

  saveChanges() {
    if (this.editForm.invalid) {
      this.toastService.showErrorToast('Please fill in all fields');
      return;
    }

    const modifiedUser = this.editForm.value as Partial<ProcessedUser>;
    this.user.set({
      ...this.user(),
      ...modifiedUser,
    });
    this.toggleEditMode();
  }
}
