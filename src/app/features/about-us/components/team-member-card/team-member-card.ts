import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TuiAppearance, TuiButton, TuiIcon, TuiTitle } from '@taiga-ui/core';
import { TuiAutoColorPipe, TuiAvatar, TuiInitialsPipe } from '@taiga-ui/kit';
import { TeamMember } from '@models/features/about-us';

@Component({
  selector: 'xas-team-member-card',
  imports: [
    TuiAppearance,
    TuiButton,
    TuiIcon,
    TuiTitle,
    TuiAvatar,
    TuiInitialsPipe,
    TuiAutoColorPipe,
  ],
  templateUrl: './team-member-card.html',
  styleUrl: './team-member-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberCard {
  readonly member = input.required<TeamMember>();
}
