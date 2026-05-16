import { Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';

@Component({
  selector: 'xas-form-input',
  imports: [FormField],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput {
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  errorMessage = input<string>('');
  id = input.required<string>();
  formField = input.required<Field<string>>();
}
