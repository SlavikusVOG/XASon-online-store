import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'xas-reactive-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form-input.html',
  styleUrl: './reactive-form-input.scss',
})
export class ReactiveFormInput {
  inputLabel = input.required<string>();
  incomingInputType = input<string>('text');
  inputPlaceholder = input<string>('');
  control = input.required<FormControl<string | null>>();
  errorMessage = input<string>('');
  inputId = input.required<string>();
}
