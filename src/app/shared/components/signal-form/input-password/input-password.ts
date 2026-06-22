import { Component, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';

@Component({
  selector: 'xas-input-password',
  imports: [FormField, TuiIcon, TuiInput, TuiPassword],
  templateUrl: './input-password.html',
  styleUrl: './input-password.scss',
})
export class InputPassword {
  inputId = input.required<string>();
  inputLabel = input.required<string>();
  inputPlaceholder = input<string>('');
  formField = input.required<Field<string>>();
}
