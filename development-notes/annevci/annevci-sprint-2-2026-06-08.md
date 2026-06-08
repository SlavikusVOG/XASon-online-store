# annevci - sprint 2 - 2026-06-08

## During this sprint I:

- set up Taiga UI library in the project — installed and configured `@taiga-ui/core`, `@taiga-ui/kit`, `@taiga-ui/icons`, `@taiga-ui/cdk` for component library usage ([Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/28));
- added CI/CD pipeline and PR template — created `.github/workflows/ci.yml` with lint, test, format, build stages and caching, and `.github/PULL_REQUEST_TEMPLATE.md` for standardized PR descriptions ([Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/33));
- implemented functional route guards (`authGuard` and `redirectIfAuthGuard`) using `CanActivateFn` for authentication-protected routes ([Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/44));
- created the complete Main page feature — built `HomePage` component with composed sections: `PromoBanner`, `CategoryNav`, `FeaturedProducts`, `PromoCodesDisplay`; defined types and mock data for categories, promo banners, and promo codes; configured lazy-loaded home routes ([Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/45));
- studied Angular documentation on Signals, Computed and Effect, `input`/`output` signal-based component API, and applied them in all new components with `ChangeDetectionStrategy.OnPush`;
- practiced Dependency Injection with `inject()` function in guards and store injection in page components;
- used `@for` control flow syntax with `track` in templates across all new components;
- participated in code reviews and discussions about router configuration, signal stores, and team workflow improvements.

## Problems:

- understanding how functional guards differ from class-based guards and how to properly use `CanActivateFn` with `inject()` for DI in Angular;
- deciding on the component composition structure for the Main page — how to split sections into reusable components while keeping the page manageable;
- figuring out the correct lazy-loading pattern for standalone components with `loadComponent` and `loadChildren`;
- resolving merge conflicts between branches after refactoring router and imports.

## Solutions:

- I studied the official Angular documentation on functional guards and the `inject` function. After experimenting with a simple guard, I implemented `authGuard` to redirect unauthenticated users to login, and `redirectIfAuthGuard` to redirect already authenticated users away from auth pages. I also updated the redirect target in `redirectIfAuthGuard` from a hardcoded catalog path to `PAGES.HOME.link` after the home page was created;
- for the Main page, I broke it down into four independent components (`PromoBanner`, `CategoryNav`, `FeaturedProducts`, `PromoCodesDisplay`), each receiving data via `input()` signals and communicating events through `output()`. This kept each component focused and testable;
- I followed the existing lazy-loading pattern used in other feature modules and extracted `homeRoutes` into a separate file, registering it in `app.routes.ts` with `loadChildren`. This keeps route configuration consistent across the project;
- during rebase I carefully resolved conflicts with [@xevoider](https://github.com/xevoider) router refactoring and import changes by keeping both sets of changes where possible and discussing ambiguous cases in Discord;
- for CI, I initially created a simple pipeline, then optimized it by adding dependency caching and parallel job execution to speed up feedback loops. The PR template was modeled after common team conventions to ensure consistent PR descriptions.

## What I learned:

- how functional guards work in Angular with `CanActivateFn`;
- how to use Signals (`input.required()`, `output()`) as the primary component API — simpler and more type-safe compared to `@Input()`/`@Output()`;
- how to compose a page from smaller presentational components using signal-based data flow;
- how to configure CI/CD pipelines with GitHub Actions including caching strategies;
- how to set up and integrate a third-party UI library (Taiga UI) into an Angular project;
- the Angular template control flow syntax (`@for` with `track`).

## Plans for next sprint:

- connect the Main page to real API data instead of mocks;
- implement search functionality on the catalog page;
- continue exploring Signals deeper, especially `computed`, `effect`, and `linkedSignal`;
- work on cart and checkout features;
- study Attribute Directives and Pipes in Angular as part of the learning plan.
