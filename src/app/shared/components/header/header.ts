import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'xas-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
