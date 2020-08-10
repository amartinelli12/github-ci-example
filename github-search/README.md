# GithubSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Coding exercise notes
I chose Angular because I am the most familiar with Angular. For a project this small, I would prefer React but wanted to make sure I was able to deliver everything in the fashion that I wanted, on time.

I used angular material for a lot of the layout. Even with that, the UI is not as appealing as I would like. The table feels crowded. I wanted to make sure I captured every key so I move all of the urls into their own object and stuck them under an accordion. Currently the click handler to navigate to Github will only fire if you lcick on the login value.

I implemented NgRx architecture, again something I wouldn't normally do for a project this small, but wanted to show that I did in fact possess an understanding of NgRx.

Items remaining:
 - Robust test suite (Unit tests against all @Injectables, ngrx pieces and E2E for all components). I like my components to be very thin wrappers and most / all logic to live outside of the component. I've found this makes for faster test CI jobs and the components are tested via E2E, which I need to write regardless.
 - Accessibility
 - Type ahead search box to filter the table data (keys off of login)
 - Far better error handling

