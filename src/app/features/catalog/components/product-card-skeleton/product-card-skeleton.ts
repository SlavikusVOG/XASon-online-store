import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiAppearance, TuiButton, TuiTitle } from '@taiga-ui/core';
import { TuiSkeleton } from '@taiga-ui/kit';

@Component({
  selector: 'xas-product-card-skeleton',
  imports: [TuiAppearance, TuiButton, TuiSkeleton, TuiTitle],
  templateUrl: './product-card-skeleton.html',
  styleUrl: './product-card-skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardSkeleton {}
