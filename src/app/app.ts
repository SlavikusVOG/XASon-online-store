import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@core/theme';
import { TuiRoot } from '@taiga-ui/core';

@Component({
  selector: 'xas-root',
  imports: [RouterOutlet, TuiRoot],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly themeService = inject(ThemeService);

  protected readonly title = signal('XASon-online-store');

  constructor() {
    this.themeService.initTheme();
  }
}
