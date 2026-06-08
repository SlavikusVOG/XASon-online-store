import { Component, input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'xas-reactive-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form-input.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './reactive-form-input.scss',
})
export class ReactiveFormInput implements OnInit {
  inputLabel = input.required<string>();
  incomingInputType = input<string>('text');
  inputPlaceholder = input<string>('');
  control = input.required<FormControl<string | null>>();
  errorMessage = input<string>('');
  inputId = input.required<string>();
  inputType = 'text';
  // TODO: fix type
  // TODO: fix value binding
  value = input<string | Date, string>('', {
    transform: (v: string) => this.transformValue(v),
  });

  togglePasswordVisibility(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  ngOnInit(): void {
    this.inputType = this.incomingInputType();
  }

  transformValue(value: string): string | Date {
    if (this.incomingInputType() === 'date') {
      return new Date(value);
    }
    return value;
  }
}
