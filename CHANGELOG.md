# CHANGELOG

Run command for (without commit):

- major: `npm version major --no-git-tag-version`
- minor: `npm version minor --no-git-tag-version`
- patch: `npm version patch --no-git-tag-version`

---

## Versions

### 1.21.2

- fix problem in `RecipeDetailComponent` to switch languages

### 1.21.1

- fix npm package vulnerabilities

### 1.21.0

- interactive anchors on page `SearchPageComponent`

### 1.20.2

- fix structure and visibility of elements on `RecipeComponent`

### 1.20.1

- npm audit

### 1.20.0

- change list items spacing in `CheckboxListComponent`
- style for page container
- loader component `<ng-loader>`
- show loading indicator on Search page when recipes are loading
- reduce modules in `SearchModule`
- analyzer plugin

### 1.19.1

- change breadcrumb link to `<a>` tag

### 1.19.0

- transform AutocompleteModule into standalone component AutocompleteComponent
- refactor project structure

### 1.18.3

- change recipe item on search page

### 1.18.2

- npm audit fix

### 1.18.1

- add outline and focus on search bar input

### 1.18.0

- remove Homepage and replace it with Search
- remove navigation links
- edit layout size
- change condition to show icon/text inside search bar

### 1.17.0

- using recaptcha service when search recipes

### 1.16.7

- prevent trigger to submit Search recipe form multiple times

### 1.16.6

- set title for Error page (404)
- refactor `LocalizedTitlePipe`

### 1.16.5

- update Angular v17 core

### 1.16.4

- npm audit fix

### 1.16.3

- refactor `NotFoundPageComponent`

### 1.16.2

- change `HomepageModule` into standalone `HomepageComponent`

### 1.16.1

- add component class into Taiwind

### 1.16.0

- remove `LanguageSwitch` module, use `LocalizationModule` as replacement

### 1.15.0

- convert `CreateFormControlComponent` into form group from form control
- new page component `CreateIngredientComponent` which is for create new ingredient

### 1.14.1

- use `.html` files for component templates
- rename component name where component is used as page
- lazy load `NotFoundPageComponent`

### 1.14.0

- add `CreateFormControlComponent` which is to create new form control in `RecipeDetailComponent`

### 1.13.9

- refactor application logic to render all data from web-page-scrapping
- fix problem with show current value in `TextDataFieldComponent`

### 1.13.8

- refactor function which find and match searched/selected ingredient
- refactor loading and fetching data from `CategoryService`
- define custom CSS classes for Input element in `AutocompleteComponent`
- move components into folders inside module
- remove unused `RecipeTitleDialogComponent`
- refactor project structure

### 1.13.7

- add paginator on page `RecipeListComponent`

### 1.13.6

- replace all snackbar usage with `SnackBarService`

### 1.13.5

- changed button bar in `RecipeDetailComponent`
- added custom action default value to `titleLocale` form control in `RecipeDetailComponent`

### 1.13.4

- fix missing image in `RecipeDetailComponent`
- mark null value in `TextDataFieldComponent`

### 1.13.3

- added Angular Lint tool
- refactor code due lint analysis

### 1.13.2

- update Angular from 17.3.1 to 17.3.3

### 1.13.1

- fix problem with writing into `TextDataFieldComponent`
- refactor `RecipeDetailComponent` to add custom action for optional ingredients also

### 1.13.0

- fix API endpoint for `data-collection-source`
- refactor `RecipeDetailComponent` how to handle and show data from web-scraper
- created module `DataCollectionModule` holding components to handle data collection information
- move `RecipeDetailComponent` into component directory
- remove unused method from `CheckboxListComponent`
- created `RecipeIngredientDialogComponent` where can edit list of required ingredients

### 1.12.1

- set Czech as default language
- add info about Recipe calories and preparation time

### 1.12.0

- refactor `RecipeDetailComponent`
- created `SharedModule` to share pipes, components, ...
- create `LanguageObject` to define localized text inside single component (don't need to create .json file for that)
- share `LocalizedTitlePipe` and refactor it to make reusable
- component `CheckboxListComponent` to show checkboxes inside `RecipeDetailComponent` + services
- make `IngredientService` available global (for root) + save response

### 1.11.1

- add option to change `title` of `DataCollectionPage` in component `RecipeTitleDialogComponent`

### 1.11.0

- add pipe `recipeTitle` to detect language change and show recipe title based on current language
- add change detection in component `RecipeComponent`
- add observable `onLanguageChange$` in `LanguageService`

### 1.10.0

- change way of showing data on page `/admin/page`
- add option to change localized title for recipe on detail page `/admin/page`
- move all Angular Material modules to `SharedMaterialModule`

### 1.9.6

- add border to autocomplete component input

### 1.9.5

- npm audit

### 1.9.4

- fix `DashboardComponent` styles
- remove Paginator number of items
- fix layout styles

### 1.9.3

- fix `AuthGuard` to redirect user whether not authenticated

### 1.9.2

- edit deploy pipeline

### 1.9.1

- remove unused code

### 1.9.0

- changed `DataCollection` endpoints
- added error message when `DataCollectionPage` already exist
- new logo

### 1.8.1

- change style of Empty recipe list message

### 1.8.0

- add form to create a new source

### 1.7.1

- npm audit

### 1.7.0

- set `ViewEncapsulation.None` as default
- remove endpoint for Auth0 login/logout
- update Angular from `17.2.2` to `17.3.1`

### 1.6.2

- npm audit fix vulnerability
- fix deploy pipeline

### 1.6.0

- use `material-icons` package instead of using `link`

### 1.5.0

- turn off hashing for PROD bundle (don't need that when has 'nonce')
- remove nonce config (handled on server side)

### 1.4.0

- created `BreadcrumbComponent` which can be server globally
  - replace for `RecipeDetailBreadcrumbComponent`
- removed `RecipeDetailBreadcrumbComponent`
- option to edit configuration setting for `DataCollectionSource` in `SourceDetailComponent`

### 1.3.0

- rename app to `Reci-pier`

### 1.2.0

- refactor of `AdminModule`
  - page for Source list `SourceListComponent`
  - page for Source detail `SourceDetailComponent`
  - page for Recipe list `RecipeListComponent`
  - page for Recipe detail `RecipeDetailComponent`

### 1.1.0

- new `RecipeDetailBreadcrumbComponent` component

### 1.0.2

- add language values for `Language` type

### 1.0.1

- Paginator component for Recipe page search

### 1.0.0

- default starting version
