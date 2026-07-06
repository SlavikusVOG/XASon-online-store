import { Component, inject, input, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthDirective } from '@shared/directives';
import { TuiIcon, TuiDropdown } from '@taiga-ui/core';
import { PAGES } from '@core/router/pages.const';
import { CustomerSessionService } from '@core/auth';

@Component({
  selector: 'xas-header',
  imports: [RouterLink, TuiIcon, RouterLinkActive, AuthDirective, TuiDropdown],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly PAGES = PAGES;

  private readonly router = inject(Router);
  private readonly customerSessionService = inject(CustomerSessionService);
  readonly cartItemCount = input<number>(0);
  readonly searchQuery = output<string>();
  readonly isProfileDropdownOpen = signal(false);

  onSearch(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.searchQuery.emit(target.value);
    }
  }

  onLogout(): void {
    this.customerSessionService.logout();
    this.isProfileDropdownOpen.set(false);
    this.router.navigate([PAGES.HOME.link]);
  }
}
