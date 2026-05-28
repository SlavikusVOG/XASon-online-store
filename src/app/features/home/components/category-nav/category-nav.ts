import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../../../../types/features/home/category.types';

@Component({
  selector: 'xas-category-nav',
  imports: [RouterLink],
  templateUrl: './category-nav.html',
  styleUrl: './category-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryNav {
  readonly categories = input.required<Category[]>();
}
