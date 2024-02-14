import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { LanguageService } from './services/language.service';
import { CookieService } from './services/cookie.service';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from "./services/category.service";

@NgModule({
  declarations: [AppComponent, RecipeComponent, SearchBarComponent, AutocompleteComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [LanguageService, CookieService, RecipeService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
