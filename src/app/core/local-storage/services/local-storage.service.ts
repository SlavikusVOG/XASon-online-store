import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Signal, effect, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  private readonly platformId = inject(PLATFORM_ID);
  private isBrowser = signal(isPlatformBrowser(this.platformId));
  private readonly signals = new Map<string, Signal<unknown>>();

  constructor() {
    if (this.isBrowser()) {
      window.addEventListener('storage', (event) => {
        if (event.key) {
          console.warn(`${event.key} has been changed`);
        }
      });
    }
  }

  setValue<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      this.handleError(error);
    }
  }

  getValue<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue) {
        return JSON.parse(serializedValue) as T;
      }
      return null;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  hasValue(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  getSignal<T>(key: string) {
    const value = this.getValue<T>(key);
    const localStorageSignal = signal(value);
    this.signals.set(key, localStorageSignal);

    effect(() => {
      this.setValue(key, localStorageSignal() as T);
    });

    return {
      value,
      update: (newValue: T) => localStorageSignal.set(newValue),
    };
  }

  private handleError(error: unknown): void {
    console.error(error);
  }
}
