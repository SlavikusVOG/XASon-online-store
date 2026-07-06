import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { createElement, type IconNode } from 'lucide';

@Component({
  selector: 'xas-lucide-icon',
  templateUrl: './lucide-icon.html',
  styleUrl: './lucide-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lucide-icon',
    'aria-hidden': 'true',
  },
})
export class LucideIcon {
  readonly icon = input.required<IconNode>();
  readonly size = input(48);

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  constructor() {
    effect(() => {
      const svg = createElement(this.icon(), {
        width: this.size(),
        height: this.size(),
      });

      this.elementRef.nativeElement.replaceChildren(svg);
    });
  }
}
