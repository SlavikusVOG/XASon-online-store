import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiAppearance, TuiTitle } from '@taiga-ui/core';
import { TuiAutoColorPipe, TuiInitialsPipe } from '@taiga-ui/kit';
import { PAGES } from '@core/router/pages.const';
import { Category } from '@models/features/home';

@Component({
  selector: 'xas-category-nav',
  imports: [RouterLink, TuiAppearance, TuiTitle, TuiAutoColorPipe, TuiInitialsPipe],
  templateUrl: './category-nav.html',
  styleUrl: './category-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryNav {
  readonly PAGES = PAGES;

  readonly categories = input.required<Category[]>();
}
