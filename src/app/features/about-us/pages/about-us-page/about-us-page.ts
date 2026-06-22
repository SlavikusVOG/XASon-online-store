import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TuiAppearance } from '@taiga-ui/core';
import { teamMembers } from '@features/about-us/data';
import { TeamMemberCard } from '@features/about-us/components';

@Component({
  selector: 'xas-about-us-page',
  imports: [TeamMemberCard, TuiAppearance],
  templateUrl: './about-us-page.html',
  styleUrl: './about-us-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPage {
  readonly teamMembers = teamMembers;
}
