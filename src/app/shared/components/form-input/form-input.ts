import { Component, input, signal, WritableSignal, OnInit } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';

@Component({
  selector: 'xas-form-input',
  imports: [FormField],
  templateUrl: './form-input.html',
  styleUrl: './form-input.scss',
})
export class FormInput implements OnInit {
  inputLabel = input.required<string>();
  incomingType = input.required<string>();
  inputPlaceholder = input<string>('');
  errorMessage = input<string>('');
  inputId = input.required<string>();
  formField = input.required<Field<string>>();
  inputType: WritableSignal<string> = signal('');
  togglePasswordVisibility(): void {
    this.inputType.set(this.inputType() === 'password' ? 'text' : 'password');
  }

  ngOnInit(): void {
    this.inputType.set(this.incomingType());
  }
}
