import { Component, model, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '@models/features/user-profile';
import { ReactiveFormInput } from '@shared/components/reactive-form-input/reactive-form-input';

@Component({
  selector: 'xas-personal-information',
  imports: [ReactiveFormsModule, ReactiveFormInput],
  templateUrl: './personal-information.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './personal-information.scss',
})
export class PersonalInformation {
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
  user = model.required<User>();
  // TODO: switch to signal
  isEditMode = false;

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
