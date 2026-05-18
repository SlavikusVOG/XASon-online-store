# annevci - sprint 1 - 2026-05-16

## During this sprint I:

- together with the team, we agreed on a unified project structure. I studied a [Medium article](https://medium.com/@bolik/angular-best-practice-file-structure-principles-2026-41f1d1383cda) and used its ideas while working on the project;
- worked on the navigation bar component — [Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/20);
- studied Angular documentation with a focus on Sprint 1 topics: Angular CLI, Standalone Components, Component Communication, and Lifecycle Hooks;
- started working on the Main page component;
- participated in discussions about project organization, GitHub workflow, pull request review rules, and task management.

## Problems:

- choosing the most suitable project structure for Angular development;
- organizing teamwork efficiently (GitHub workflow, meetings, task board, project naming, and branch naming conventions);
- figuring out how to display the header only on specific pages and exclude it from login and registration pages.

## Solutions:

- the project structure and team workflow were actively discussed during online meetings and in the Discord channel. We quickly found a suitable solution предложed by [@SlavikusVOG](https://github.com/SlavikusVOG) based on the [Medium article](https://medium.com/@bolik/angular-best-practice-file-structure-principles-2026-41f1d1383cda). We also agreed on branch naming conventions (`feat-component-{name}`), pull request review requirements (at least one approval), and created a GitHub project board for task management;
- while developing the navigation bar component, I learned more about Angular component structure, standalone components, template organization, and routing integration;
- for the conditional header rendering problem, I researched different solutions using Google and discussions with AI chat tools. After filtering out outdated approaches, I focused on two options: conditional rendering with `@if` in `app.component` and layout-based architecture. After discussing it with [@xevoider](https://github.com/xevoider), we decided to use layout components because this approach is cleaner and more scalable for larger applications;
- while working on the Main page component, I practiced component composition and thought about how dynamic content could later be connected through APIs.

## What I learned:

- how to organize an Angular project using a scalable feature-based structure;
- how standalone components simplify Angular architecture;
- basics of component communication and Angular lifecycle hooks;
- how layout components can be used to separate authenticated and non-authenticated pages cleanly;
- how important team conventions and clear GitHub workflows are for collaborative development.

## Plans for next sprint:

- finish integrating the header with completed pages and discuss search and authentication implementation with the team;
- continue developing the Main page and connect APIs for dynamic content updates;
- continue studying Angular concepts such as Route Configuration (standalone), Functional Guards, Signals, Computed and Effect;
- explore better architectural approaches and best practices for future tasks.
