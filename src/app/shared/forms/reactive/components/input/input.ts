import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { provideValueAccessor, ReactiveControl } from '@shared/forms/reactive/reactive-control';
import { TuiError } from '@taiga-ui/core';

@Component({
  selector: 'xas-reactive-input',
  imports: [FormsModule, ReactiveFormsModule, TuiError],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [provideValueAccessor(ReactiveInput)],
})
export class ReactiveInput extends ReactiveControl<string | null> implements AfterViewInit {
  public hostControl?: FormControl;

  public ngAfterViewInit(): void {
    const hostCtrl = this.injector.get(NgControl, null);

    if (hostCtrl?.control instanceof FormControl) {
      this.hostControl = hostCtrl.control;
    }
  }
}
