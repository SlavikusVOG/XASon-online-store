import { Component, input, model, output, signal } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import {
  TuiIcon,
  TuiInputDirective,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldOptionsDirective,
} from '@taiga-ui/core';

@Component({
  selector: 'xas-password-input',
  imports: [
    TuiLabel,
    TuiIcon,
    TuiTextfieldComponent,
    TuiTextfieldOptionsDirective,
    TuiInputDirective,
  ],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
})
export class PasswordInput implements FormValueControl<string> {
  public readonly dirty = input(false);
  public readonly label = input<string>('');
  public readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  public readonly invalid = input<boolean>(false);
  public readonly touched = input<boolean>(false);

  public readonly value = model('');

  public readonly touch = output();

  public readonly isVisible = signal(false);

  public togglePasswordVisibility(): void {
    this.isVisible.update((isVisible) => !isVisible);
  }
}
