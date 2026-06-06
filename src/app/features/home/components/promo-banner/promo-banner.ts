import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner } from '../../../../types/features/home/promo.types';

@Component({
  selector: 'xas-promo-banner',
  imports: [RouterLink],
  templateUrl: './promo-banner.html',
  styleUrl: './promo-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoBanner {
  readonly banners = input.required<Banner[]>();
}
