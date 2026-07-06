import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { TuiButton, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { PromoCode } from '@models/features/home';

@Component({
  selector: 'xas-promo-codes-display',
  imports: [TuiButton, TuiIcon, TuiTitle],
  templateUrl: './promo-codes-display.html',
  styleUrl: './promo-codes-display.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoCodesDisplay {
  readonly promoCodes = input.required<PromoCode[]>();
  readonly copiedId = signal<string | null>(null);

  async copyCode(code: string, id: string): Promise<void> {
    await navigator.clipboard.writeText(code);
    this.copiedId.set(id);

    setTimeout(() => this.copiedId.set(null), 1500);
  }
}
