import { Component, input, model, output } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import {
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldOptionsDirective,
  TuiInputDirective,
} from '@taiga-ui/core';

@Component({
  selector: 'xas-input',
  imports: [TuiLabel, TuiTextfieldComponent, TuiTextfieldOptionsDirective, TuiInputDirective],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class Input implements FormValueControl<string> {
  public readonly dirty = input(false);
  public readonly label = input<string>('');
  public readonly errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  public readonly invalid = input<boolean>(false);
  public readonly touched = input<boolean>(false);

  public readonly value = model('');

  public readonly touch = output();
}
