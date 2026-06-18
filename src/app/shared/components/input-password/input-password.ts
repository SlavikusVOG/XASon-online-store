import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiIcon, TuiInput } from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';

@Component({
  selector: 'xas-input-password',
  imports: [FormsModule, TuiIcon, TuiInput, TuiPassword],
  templateUrl: './input-password.html',
  styleUrl: './input-password.scss',
})
export class InputPassword {
  protected value = signal<string>('');
  protected inputId = input.required<string>();
  protected inputLabel = input.required<string>();
  protected inputPlaceholder = input<string>('');
}
