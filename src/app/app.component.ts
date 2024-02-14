import { Component } from '@angular/core';

import { RecipeService } from './services/recipe.service';
import { Recipe } from './models/recipe.interface';
import { Language } from './types/language.type';
import { LanguageService } from './services/language.service';
import locale from './app.locale.json';
import { Ingredient } from './models/ingredient.interface';

@Component({
  selector: 'app-root',
  template: `
    <div class="relative block">
      <!--navigation-->
      <nav class="">
        <!-- LOGO -->
        <div class="mx-14 py-4 flex items-center justify-end">
          <button
            type="button"
            class="text-sm font-medium rounded px-2 py-1"
            [ngClass]="{ 'bg-gray-950 text-gray-100': langService.language === 'en' }"
            (click)="changeLanguage('en')"
          >
            {{ locale[langService.language].English }}
          </button>
          <button
            type="button"
            class="text-sm font-medium rounded px-2 py-1"
            [ngClass]="{ 'bg-gray-950 text-gray-100': langService.language === 'cs' }"
            (click)="changeLanguage('cs')"
          >
            {{ locale[langService.language].Czech }}
          </button>
        </div>
      </nav>
      <!--promo text-->
      <!-- TODO: standalone component -->
      <div class="py-9 mx-14">
        <h2 class="text-4xl font-semibold mb-1">{{ locale[langService.language].PromoText1 }}</h2>
        <h2 class="text-4xl font-semibold">{{ locale[langService.language].PromoText2 }}</h2>
      </div>
      <!--Search bar-->
      <div class="py-8 mx-14">
        <app-search-bar (onSubmit)="submit($event)" />
      </div>
      <!-- Recipes -->
      <div class="py-8 mx-14">
        <app-recipe [list]="recipeList" />
      </div>
    </div>
  `,
})
export class AppComponent {
  protected readonly locale = locale;
  protected recipeList: Recipe[] = [];

  constructor(
    private readonly recipeService: RecipeService,
    protected readonly langService: LanguageService
  ) {}

  /**
   * Submit selected ingredients
   * @param ingredients
   */
  protected submit(ingredients: Ingredient[]) {
    const ingredientNames = ingredients.map((ing) => ing.name);

    this.recipeService.findRecipes(ingredientNames).subscribe({
      next: (response) => {
        this.recipeList = response;
      },
    });
  }

  /**
   * Change current language
   * @param lang
   */
  protected changeLanguage(lang: Language) {
    this.langService.language = lang;
  }
}
