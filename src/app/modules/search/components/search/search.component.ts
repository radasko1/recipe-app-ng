import { Component, OnInit } from '@angular/core';
import locale from '../../../../app.locale.json';
import { LanguageService } from '../../../../services/language.service';
import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../../../services/recipe.service';
import { Ingredient } from "../../models/ingredient.interface";

@Component({
  selector: 'app-search',
  template: `
    <!--promo text-->
    <!--  TODO may be part of Homepage with button to route into /search  -->
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
  `,
})
export class SearchComponent {
  protected readonly locale = locale;
  protected recipeList: Recipe[] = [];

  constructor(
    protected readonly langService: LanguageService,
    private readonly recipeService: RecipeService
  ) {}

  /**
   * Submit selected ingredients
   * @param ingredients
   */
  protected submit(ingredients: Ingredient[]) {
    const ingredientIDs = ingredients.map((ing) => ing.id);

    this.recipeService.findRecipes(ingredientIDs).subscribe({
      next: (response) => {
        this.recipeList = response;
      },
    });
  }
}
