import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'xas-header',
  imports: [RouterLink, TuiIcon, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly isAuthenticated = input<boolean>(false);
  readonly cartItemCount = input<number>(0);
  readonly searchQuery = output<string>();
  readonly logoutRequested = output<void>();

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
