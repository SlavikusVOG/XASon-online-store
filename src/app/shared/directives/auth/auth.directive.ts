import {
  Directive,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
  computed,
  effect,
} from '@angular/core';
import { AuthService } from '@core/auth';

type AuthMode = 'authenticated' | 'guest';

@Directive({
  selector: '[xasAuth]',
})
export class AuthDirective {
  private readonly authService = inject(AuthService);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly vcr = inject(ViewContainerRef);

  readonly mode = input.required<AuthMode>({
    alias: 'xasAuth',
  });

  private readonly shouldShow = computed(() => {
    const isAuthenticated = this.authService.isAuthenticated();

    return this.mode() === 'authenticated' ? isAuthenticated : !isAuthenticated;
  });

  constructor() {
    effect(() => {
      if (this.shouldShow()) {
        this.vcr.createEmbeddedView(this.templateRef);
      } else {
        this.vcr.clear();
      }
    });
  }
}
