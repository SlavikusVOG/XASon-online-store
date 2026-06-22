import { Component, input, output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthDirective } from '@shared/directives';
import { TuiIcon, TuiDropdown } from '@taiga-ui/core';

@Component({
  selector: 'xas-header',
  imports: [RouterLink, TuiIcon, RouterLinkActive, AuthDirective, TuiDropdown],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly cartItemCount = input<number>(0);
  readonly searchQuery = output<string>();
  readonly logoutRequested = output<void>();
  readonly isProfileDropdownOpen = signal(false);

  onSearch(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.searchQuery.emit(target.value);
    }
  }

  onLogout(): void {
    this.logoutRequested.emit();
  }
}
