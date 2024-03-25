# CHANGELOG

List of application versions with description

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

