import { AfterViewInit, Component, input } from '@angular/core';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import {
  TuiErrorComponent,
  TuiIcon,
  TuiInputDirective,
  TuiLabel,
  TuiError,
  TuiTextfieldComponent,
  TuiTextfieldOptionsDirective,
} from '@taiga-ui/core';
import { TuiPassword } from '@taiga-ui/kit';
import { provideValueAccessor, ReactiveControl } from '../../reactive-control';

@Component({
  selector: 'xas-reactive-password-input',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiErrorComponent,
    TuiIcon,
    TuiInputDirective,
    TuiLabel,
    TuiError,
    TuiPassword,
    TuiTextfieldComponent,
    TuiTextfieldOptionsDirective,
  ],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  providers: [provideValueAccessor(ReactivePasswordInput)],
})
export class ReactivePasswordInput extends ReactiveControl<string | null> implements AfterViewInit {
  public readonly label = input<string>('');
  public readonly placeholder = input<string>('');
  public hostControl?: FormControl;

  ngAfterViewInit(): void {
    const hostCtrl = this.injector.get(NgControl, null);
    if (hostCtrl?.control instanceof FormControl) {
      this.hostControl = hostCtrl.control;
    }
  }
}
