import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiAppearance, TuiButton, TuiTitle } from '@taiga-ui/core';
import { Banner } from '@models/features/home';

@Component({
  selector: 'xas-promo-banner',
  imports: [RouterLink, TuiAppearance, TuiButton, TuiTitle],
  templateUrl: './promo-banner.html',
  styleUrl: './promo-banner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromoBanner {
  readonly banners = input.required<Banner[]>();
}
