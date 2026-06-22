import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';

@Directive({
  selector:
    'input[xasHighlightIfEmpty]:not([type="checkbox"]):not([type="radio"]):not([type="hidden"])',
  host: {
    '(input)': 'updateEmptyState()',
    '(blur)': 'updateEmptyState()',
    '(focus)': 'updateEmptyState()',
    '[class.input-empty]': 'isEmpty()',
  },
})
export class HighlightIfEmptyDirective implements OnInit {
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);
  private readonly ngControl = inject(NgControl, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  readonly isEmpty = signal(true);

  constructor() {
    afterNextRender(() => this.updateEmptyState());
  }

  ngOnInit(): void {
    const control = this.ngControl?.control;
    if (!control) {
      return;
    }

    control.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateEmptyState();
    });
    this.updateEmptyState();
  }

  updateEmptyState(): void {
    const value = this.ngControl?.value ?? this.elementRef.nativeElement.value;
    this.isEmpty.set(value == null || String(value).trim() === '');
  }
}
