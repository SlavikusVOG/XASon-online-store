import { Component } from '@angular/core';
import { provideValueAccessor, ReactiveControl } from '@shared/forms/reactive/reactive-control';

@Component({
  selector: 'xas-reactive-password-input',
  imports: [],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  providers: [provideValueAccessor(ReactivePasswordInput)],
})
export class ReactivePasswordInput extends ReactiveControl<string | null> {}
