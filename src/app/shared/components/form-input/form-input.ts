import { Component, input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';

@Component({
  selector: 'xas-form-input',
  imports: [FormField],
  templateUrl: './form-input.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './form-input.scss',
})
export class FormInput implements OnInit {
  inputLabel = input.required<string>();
  incomingType = input.required<string>();
  inputPlaceholder = input<string>('');
  errorMessage = input<string>('');
  inputId = input.required<string>();
  formField = input<Field<string> | undefined>(undefined);
  inputType: string | undefined;

  togglePasswordVisibility(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    this.inputType = this.incomingType();
  }
}
