import { Component, inject, model } from '@angular/core';
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
export class PersonalInformation {
  private readonly toastService = inject(ToastService);
  editForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
  });
  user = model.required<ProcessedUser | null>();
  // TODO: switch to signal
  isEditMode = false;

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

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
