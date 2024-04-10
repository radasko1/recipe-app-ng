import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IngredientService } from '../../../shared/services/ingredient-service/ingredient.service';
import { Ingredient } from '../../models/ingredient.interface';
import locale from './search-bar.locale.json';
import { IngredientModalComponent } from '../ingredient-modal/ingredient-modal.component';
import { IngredientDialogService } from '../../services/ingredient-dialog.service';
import { RecipeService } from '../../services/recipe.service';
import { LanguageService } from '../../../shared/services/language-service/language.service';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="block my-8">
      <div class="flex relative rounded border-[1px] border-black shadow-sm">
        <!-- Search bar -->
        <ng-container *ngIf="ingredientList$ | async as ingredients">
          <ng-autocomplete
            class="flex-1"
            searchProp="locale"
            [list]="ingredients"
            [placeholder]="locale[langService.language].SearchIngredient"
            (onSelect)="onSelect($event)"
          ></ng-autocomplete>
        </ng-container>
        <!-- List button -->
        <button
          aria-label="Ingredient List Button"
          type="button"
          class="bg-transparent border-x-[1px] border-black text-gray-950 outline-0 py-1 px-4 inline-flex items-center text-sm font-medium hover:bg-gray-950 hover:text-white hover:border-white"
          (click)="openIngredientDialog()"
        >
          <span class="h-6" *ngIf="!ingredientDialogService.selectedCount">
            <mat-icon aria-hidden="false" fontIcon="kitchen"></mat-icon>
          </span>
          <span class="hidden md:block" *ngIf="ingredientDialogService.selectedCount">
            {{ ingredientDialogService.selectedCount }}
          </span>
          <span class="hidden md:block ml-2">{{ locale[langService.language].ListButton }}</span>
        </button>
        <!-- Search button -->
        <button
          aria-label="Search Recipe Button"
          type="submit"
          class="outline-0 py-1 px-4 inline-flex items-center justify-center text-sm font-medium bg-gray-950 text-white hover:bg-blue-600"
          (click)="onSearch()"
        >
          <mat-icon fontIcon="search"></mat-icon>
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent {
  protected readonly locale = locale;
  protected readonly ingredientList$ = this.ingredientService.getList();

  constructor(
    protected readonly langService: LanguageService,
    protected readonly ingredientDialogService: IngredientDialogService,
    private readonly ingredientService: IngredientService,
    private readonly recipeService: RecipeService,
    private readonly dialog: MatDialog
  ) {}

  protected openIngredientDialog() {
    const dialogRef = this.dialog.open(IngredientModalComponent);
  }

  /** Select Ingredient from Autocomplete component */
  protected onSelect(selectedItem: Ingredient) {
    if (!selectedItem) {
      return;
    }
    this.ingredientDialogService.ingredientSelect(selectedItem);
  }

  protected onSearch() {
    const selectedIngredients = this.ingredientDialogService.selectedList;
    if (!selectedIngredients.length) {
      return;
    }
    const ids = selectedIngredients.map((ingredient) => ingredient.id);

    this.recipeService.findRecipes(ids).subscribe();
  }
}
