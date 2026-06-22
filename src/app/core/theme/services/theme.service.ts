import { inject, RendererFactory2, Service, signal } from '@angular/core';
import { LocalStorage, localStorageKeys } from '@core/local-storage';
import { Theme, Themes } from '@core/theme/types/theme.types';

@Service()
export class ThemeService {
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly localStorageService = inject(LocalStorage);

  private readonly renderer = this.rendererFactory.createRenderer(null, null);
  private readonly colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  public readonly theme = signal<Theme>(Themes.SYSTEM);

  public initTheme(): void {
    const chosenTheme =
      this.localStorageService.getValue<Theme>(localStorageKeys.THEME) ?? Themes.SYSTEM;

    this.setTheme(chosenTheme);

    this.colorSchemeQuery.addEventListener('change', (event) => {
      if (this.localStorageService.getValue<Theme>(localStorageKeys.THEME) === Themes.SYSTEM) {
        this.updateClass(event.matches);
      }
    });
  }

  public setTheme(theme: Theme): void {
    this.theme.set(theme);
    this.localStorageService.setValue(localStorageKeys.THEME, theme);

    if (theme === Themes.SYSTEM) {
      this.updateClass(this.colorSchemeQuery.matches);
    } else {
      this.updateClass(theme === Themes.DARK);
    }
  }

  private updateClass(isDarkTheme: boolean): void {
    if (isDarkTheme) {
      this.renderer.addClass(document.documentElement, 'dark-mode');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark-mode');
    }
  }
}
