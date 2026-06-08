# xevoider - sprint 2 - 2026-06-08

## During this sprint I:

- refactored imports in the project - [Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/35) - set an opinionated folder structure for the project (features specifically);
- refactored router - [Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/36) - move routes to a constant, use lazy loading for routes, use binding url params to component inputs;
- read signal forms documentation and tried to use it on a testing project;
- read NgRx Signal Store documentation, added it to the project and replace `CatalogService` with `CatalogStore`, that uses signal store.

## Problems:

- have some doubts about how configurable forms on Signal Forms could be (how convinient would it be to build them on some rules or field config objects).

## Solutions:

- (probably) try to create a builder service for a signal form.

## Plans for next sprint:

- make a deep dive into Angular Change Detection & DI system;
- read about Reactive Forms and compare them with Signal Forms on practice;
- read TaigaUI documentation, install some libraries from its ecosystem and create shared components.
