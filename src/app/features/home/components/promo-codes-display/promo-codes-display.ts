import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PromoCode } from '@models/features/home';

@Component({
  selector: 'xas-promo-codes-display',
  imports: [],
  templateUrl: './promo-codes-display.html',
  styleUrl: './promo-codes-display.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoCodesDisplay {
  readonly promoCodes = input.required<PromoCode[]>();
}
