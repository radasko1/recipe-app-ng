import { Component } from '@angular/core';
import locale from '../../locale.json';
import { LanguageService } from '../../../../services/language.service';
import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient } from '../../models/ingredient.interface';

@Component({
  selector: 'app-search',
  template: `
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
  protected recipeList: Recipe[] | undefined;

  constructor(private readonly recipeService: RecipeService) {}

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
