import { Component, input, OnInit } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { HighlightIfEmptyDirective } from '@shared/directives';

@Component({
  selector: 'xas-form-input',
  imports: [FormField, HighlightIfEmptyDirective],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class SignalFormInput implements OnInit {
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
