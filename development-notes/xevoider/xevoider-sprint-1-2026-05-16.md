# xevoider - sprint 1 - 2026-05-16

## During this sprint I:

- did a project setup - integrated ESLint, Prettier, Husky and lint-staged to secure code quality and beauty - [Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/1);
- started integrating project structure from a [Medium article](https://medium.com/@bolik/angular-best-practice-file-structure-principles-2026-41f1d1383cda) suggested by [@SlavikusVOG](https://github.com/SlavikusVOG);
- created a catalog page with product cards on mock data - [Pull Request](https://github.com/SlavikusVOG/XASon-online-store/pull/15);
- started carefully reading Angular's documentation and testing different stuff from there;
- created the first version of ApiService.

## Problems:

- adding ESLint and Prettier to the project and making them work together;
- absence of types for options of methods in `HttpClient` - the developers decided to create a lot of different method signatures instead - now I cannot properly type options for wrapper methods.

## Solutions:

- consulted Gemini how to integrate ESLint and Prettier to the project, how to make Prettier's rules more important than ESLint's ones, what ESLint rules to set for better Angular code;
- now I see two variants - copy-paste all possible options' types and make a union which I will use or leave everything as-is and pray to TypeScript gods for auto type infering. Either way, I will ask AI first about this situation and try to make it to implement a solution for me.

## Plans for next sprint:

- finish ApiService;
- set products data in Commercetools and use it instead of mocks;
- add more functionality to Catalog page that is tied to Commercetools API (searching, filtering, sorting);
- continue reading Angular's documentation and practicing with all types of forms (signal, reactive, template), get a good understanding of Angular's DI system;
- look through `@angular-eslint/template` package in search for other useful rules;
- implementing NgRx Signal Stores for data storing.
