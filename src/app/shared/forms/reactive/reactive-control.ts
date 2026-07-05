import { forwardRef, inject, Injector, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// eslint-disable-next-line
const noop = () => {};

type OnChangeFn = (value: unknown) => void;
type OnTouchedFn = () => void;

export abstract class ReactiveControl<T> implements ControlValueAccessor {
  public readonly injector = inject(Injector);

  public readonly isDisabled = signal(false);
  public readonly value = signal<T | null>(null);

  private onTouchedCallback: OnTouchedFn = noop;
  private onChangeCallback: OnChangeFn = noop;

  /**
   * Записать значение в контрол
   */
  public writeValue(value: T): void {
    this.value.set(value);
  }

  /**
   * Записать значение в контрол + оповестить модель об изменении
   */
  public changeValue(value: T): void {
    this.value.set(value);
    this.onChanged(value);
  }

  public onTouched(): void {
    this.onTouchedCallback();
  }

  public onChanged(value: T): void {
    this.onChangeCallback(value);
  }

  public registerOnChange(fn: OnChangeFn): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: OnTouchedFn): void {
    this.onTouchedCallback = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}

export const provideValueAccessor = (payload: unknown) => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => payload),
  multi: true,
});
