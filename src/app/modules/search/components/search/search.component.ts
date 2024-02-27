import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import locale from '../../locale.json';
import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient } from '../../models/ingredient.interface';
import { APP_PAGE_TITLE } from '../../../../app.settings';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-search-page',
  template: `
    <!--page container-->
    <div class="py-10 mx-auto max-w-[920px]">
      <h2 class="font-bold text-4xl text-center">{{ locale[langService.language].FindRecipes }}</h2>
      <div class="my-8">
        <p class="text-center mb-2">{{ locale[langService.language].SearchText1 }}</p>
        <!--TODO after click of underline text, focus on element?-->
        <p class="text-center" [innerHTML]="locale[langService.language].SearchText2"></p>
      </div>
      <!--Search bar-->
      <div class="py-8">
        <app-search-bar (onSubmit)="submit($event)" />
      </div>
      <!-- Recipes -->
      <app-recipe [list]="recipeList" />
    </div>
  `,
})
export class SearchComponent {
  protected readonly locale = locale;
  protected recipeList: Recipe[] | undefined;

  constructor(
    readonly title: Title,
    private readonly recipeService: RecipeService,
    protected readonly langService: LanguageService
  ) {
    title.setTitle(APP_PAGE_TITLE.SEARCH[langService.language]);
  }

  /**
   * Submit selected ingredients
   * @param ingredients
   */
  protected submit(ingredients: Ingredient[]) {
    const ingredientIDs = ingredients.map((ing) => ing.id);
    if (!ingredientIDs) {
      return;
    }
    // error?

    this.recipeService.findRecipes(ingredientIDs).subscribe({
      next: (response) => {
        this.recipeList = response;
      },
    });
  }
}
