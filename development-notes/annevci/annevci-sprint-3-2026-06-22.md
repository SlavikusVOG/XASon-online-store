# annevci - sprint 3 - 2026-06-22

## During this sprint I:

- built the "About Us" page with team member cards, mock data, routing ([Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/61));
- wrote a custom structural directive `AuthDirective` using signals - it conditionally shows content based on whether the user is logged in or a guest ([Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/60));
- added a profile dropdown to the header using Taiga UI `tuiDropdown` - it now shows different navigation items depending on auth status ([Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/66));
- integrated `AuthDirective` into the dropdown template so guests see "Sign In" / "Cart" while authenticated users see "Account" / "Cart";
- studied a bunch of new Angular topics from the sprint plan: custom directives (attribute and structural), pipes, reactive forms, content projection, OnPush change detection, and advanced DI with `InjectionToken`;

## Problems:

- figuring out how to build a structural directive with signals from scratch - I wanted it to work via `computed` + `effect`;
- wrapping my head around `TemplateRef` and `ViewContainerRef` at first - understanding that a structural directive doesn't just hide an element but actually adds/removes it from the DOM;
- Taiga UI `tuiDropdown` + a custom structural directive inside `ng-template` was a weird combo - the directive wouldn't pick up the context properly until I wrapped it in `ng-container` instead of applying `*xasAuth` directly on the anchor elements;
- the About Us team member card uses `ChangeDetectionStrategy.OnPush`, and at first the card wasn't re-rendering when I passed new mock data - forgot that `@for` with `track` needs stable identities, and OnPush only checks inputs by reference;

## Solutions:

- for the directive, I settled on `input.required()` -> `computed()` -> `effect()`: `computed` derives a boolean from the auth service signal and the directive mode input, and `effect` either creates an embedded view via `createEmbeddedView()` or clears the container. no lifecycle hooks or manual cleanup needed;
- for the dropdown, I used `*ng-container` with `*xasAuth` structural directive to wrap two separate sets of links inside the same `ng-template`. Taiga UI `tuiDropdown` + `tuiDropdownOpen` made the open/close state management straightforward;
- followed the same pattern as the Main page from sprint 2: page component + card via `@for` with `track` and signal `input()`;

## What I learned:

- how to create a custom structural directive with `TemplateRef` and `ViewContainerRef`, and why structural directives actually add/remove DOM elements while attribute directives just fiddle with the element they're on;
- how `effect()` works in a real scenario: subscribing to signals inside a directive and reactively creating or destroying views, no lifecycle hooks needed;
- `computed` is lazy - it only re-evaluates when something reads it and only if its dependencies actually changed;
- `ng-template` and `ng-container` finally clicked: `ng-template` is a blueprint, `ng-container` is a grouping element that doesn't render a real DOM node - perfect for structural directives;
- the difference between `*ngIf`/`*ngFor` and the new `@if`/`@for` control flow: structural directives are more flexible (you can build custom ones like `*xasAuth`), while the `@` syntax is more convenient for simple conditions and loops;
- how to use Taiga UI `tuiDropdown` for a popup menu - way simpler than building a custom dropdown from scratch;

## Plans for next sprint:

- dive deeper into `markForCheck()` vs `detectChanges()` and how OnPush interacts with signals;
- add style for navbar, home page;
- create page "User Profile";
- connect real APIs instead of mocks.
