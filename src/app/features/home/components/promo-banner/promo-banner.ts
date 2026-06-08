import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner } from '@models/features/home';

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
