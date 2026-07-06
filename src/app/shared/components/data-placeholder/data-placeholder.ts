import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { type IconNode } from 'lucide';
import { LucideIcon } from '@shared/components';

@Component({
  selector: 'xas-data-placeholder',
  imports: [LucideIcon, TuiButton],
  templateUrl: './data-placeholder.html',
  styleUrl: './data-placeholder.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPlaceholder {
  readonly icon = input.required<IconNode>();
  readonly text = input.required<string>();
  readonly buttonText = input.required<string>();

  readonly retry = output<void>();

  protected onRetry(): void {
    this.retry.emit();
  }
}
