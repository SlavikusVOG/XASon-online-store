import { Component, computed, inject, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerSessionService } from '@core/auth';
import { PAGES } from '@core/router/pages.const';
import { CartStore } from '@features/cart/store';
import { AuthDirective } from '@shared/directives';
import { TuiDropdown, TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'xas-header',
  imports: [RouterLink, TuiIcon, RouterLinkActive, AuthDirective, TuiDropdown],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly PAGES = PAGES;
  protected readonly cartStore = inject(CartStore);

  private readonly router = inject(Router);
  private readonly customerSessionService = inject(CustomerSessionService);
  readonly searchQuery = output<string>();
  readonly isProfileDropdownOpen = signal(false);

  protected readonly cartAriaLabel = computed(() => {
    const count = this.cartStore.itemCount();
    if (count === 0) {
      return 'Cart, empty';
    }

    return `Cart, ${count} ${count === 1 ? 'item' : 'items'}`;
  });

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
