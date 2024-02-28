import { Component } from '@angular/core';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { RecipeService } from '../../services/recipe.service';
import locale from './recipe.locale.json';

@Component({
  selector: 'app-recipe',
  template: `
    <ng-container *ngIf="recipeList$ | async as recipeList">
      <!--List of Recipes-->
      <ng-template [ngIf]="recipeList.length">
        <div
          *ngFor="let recipe of recipeList; last as rLast"
          class="block py-8"
          [class.mb-6]="!rLast"
        >
          <div class="flex gap-4">
            <div class="w-1/4">
              <img [src]="recipe.image_url" [alt]="recipe.name" class="img-fluid" />
            </div>
            <div class="w-3/4">
              <h5 class="text-2xl font-semibold mb-3">{{ recipe.name }}</h5>
              <div class="flex flex-wrap gap-1">
                <!--selected = available (green)-->
                <span
                  *ngFor="let selectIngredient of recipe.selectedIngredients"
                  class="inline-flex items-center gap-1 bg-green-600 text-gray-50 rounded-md px-2 py-1 text-xs font-medium"
                >
                  {{ selectIngredient.locale[lang.language] }}
                </span>
                <!--required = unavailable (red)-->
                <span
                  *ngFor="let requestIngredient of recipe.requiredIngredients"
                  class="inline-flex items-center gap-1 bg-red-500 text-white rounded-md px-2 py-1 text-xs font-medium"
                >
                  {{ requestIngredient.locale[lang.language] }}
                </span>
                <!--optional = don't need (orange)-->
                <span
                  *ngFor="let requestIngredient of recipe.optionalIngredients"
                  class="inline-flex items-center gap-1 bg-amber-300 text-white rounded-md px-2 py-1 text-xs font-medium"
                >
                  {{ requestIngredient.locale[lang.language] }}
                </span>
              </div>
              <a [href]="recipe.link" target="_blank">{{ locale[lang.language].Link }}</a>
            </div>
          </div>
        </div>
      </ng-template>
      <!--Empty Recipe list result-->
      <ng-template [ngIf]="!recipeList.length">
        <p class="text-medium text-red-600">{{ locale[lang.language].EmptySearchResult }}</p>
      </ng-template>
    </ng-container>
  `,
})
export class RecipeComponent {
  protected readonly locale = locale;
  protected readonly recipeList$ = this.recipeService.onSearch$;

  constructor(
    protected readonly lang: LanguageService,
    private readonly recipeService: RecipeService
  ) {}
}
