import { Component } from '@angular/core';
import locale from '../../locale.json';
import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { Ingredient } from '../../models/ingredient.interface';

@Component({
  selector: 'app-search-page',
  template: `
    <!--page container-->
    <div class="py-10 mx-auto max-w-[920px]">
      <h2 class="font-bold text-4xl text-center">Vyhledávání receptů</h2>
      <div class="my-8">
        <p class="text-center mb-2">Vyhledejte recepty na základě dostupných ingrediencí.</p>
        <!--TODO after click of underline text, focus on element?-->
        <p class="text-center">
          Zadejte jednotlivé ingredience do <u>vyhledávače</u>, nebo je zaškrtejte v
          <u>seznamu ingrediencí</u>.
        </p>
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
