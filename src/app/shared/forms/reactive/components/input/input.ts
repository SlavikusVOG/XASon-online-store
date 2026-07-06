import { AfterViewInit, Component, input } from '@angular/core';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { provideValueAccessor, ReactiveControl } from '@shared/forms/reactive/reactive-control';
import {
  TuiLabel,
  TuiTextfieldComponent,
  TuiInputDirective,
  TuiError,
  TuiTextfieldOptionsDirective,
} from '@taiga-ui/core';

@Component({
  selector: 'xas-reactive-input',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiLabel,
    TuiTextfieldComponent,
    TuiInputDirective,
    TuiError,
    TuiTextfieldOptionsDirective,
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [provideValueAccessor(ReactiveInput)],
})
export class ReactiveInput extends ReactiveControl<string | null> implements AfterViewInit {
  public readonly label = input<string>('');
  public readonly placeholder = input<string>('');
  public readonly type = input<string>('text');
  public hostControl?: FormControl;

  public ngAfterViewInit(): void {
    const hostCtrl = this.injector.get(NgControl, null);

    if (hostCtrl?.control instanceof FormControl) {
      this.hostControl = hostCtrl.control;
    }
  }
}
