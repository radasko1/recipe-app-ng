# Recipe App

This project is using version **17.1.3.**

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Update

Run `ng update` to see new available version.

It is recommended to run also `npm audit`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## App Structure

- Each module has own dependencies that are needed
- shared `providedIn: 'root'` services are not provided anywhere - they can just be used in constructor as dependency-injection

## Next application development
- Udelat na strance 'container'
- Pridat stranku pro Registraci uzivatele `/signup`
- Pridat stranku pro prihlaseni `/login`
- Pridat Captcha
- Pridat Administracni stranku pro manipulaci s web scrapingem
