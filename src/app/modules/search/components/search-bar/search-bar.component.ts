import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { Ingredient } from '../../models/ingredient.interface';
import { LanguageService } from '../../../../services/language.service';
import locale from './search-bar.locale.json';
import { IngredientCategory } from '../../models/ingredient-category.interface';
import { CategoryService } from '../../services/category.service';
import { IngredientModalComponent } from '../ingredient-modal/ingredient-modal.component';
import { IngredientDialogService } from '../../services/ingredient-dialog.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="block py-8">
      <!-- Search bar -->
      <div class="flex relative rounded border-[1px] border-black shadow-sm">
        <ng-autocomplete
          class="flex-1"
          [placeholder]="locale[langService.language].SearchIngredient"
          searchProp="locale"
          (onSelect)="onSelect($event)"
        ></ng-autocomplete>
        <!-- List button -->
        <button
          class="bg-transparent border-x-[1px] border-black text-gray-950 outline-0 py-1 px-4 inline-flex gap-1 items-center text-sm font-medium hover:bg-gray-950 hover:text-white hover:border-white"
          (click)="openIngredientDialog()"
        >
          <span><i class="fa-solid fa-list"></i></span>
          <span class="ml-2">{{ locale[langService.language].ListButton }}</span>
        </button>
        <!-- Search button -->
        <button
          class="outline-0 py-1 px-4 inline-flex items-center justify-center text-sm font-medium bg-gray-950 text-white hover:bg-blue-600"
          (click)="searchRecipe()"
        >
          <i class="fa-solid fa-magnifying-glass fa-lg"></i>
        </button>
      </div>
    </div>
  `,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();
  /** Localization texts */
  protected readonly locale = locale;

  protected categoryList: IngredientCategory[] = [];
  protected ingredientList: Ingredient[] = [];

  constructor(
    protected readonly langService: LanguageService,
    private readonly categoryService: CategoryService,
    private readonly ingredientDialogService: IngredientDialogService,
    private readonly recipeService: RecipeService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    // Get ingredient categories
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.subscription))
      .subscribe({
        next: (data) => {
          this.categoryList = data;
        },
      });

    this.categoryService
      .getAllIngredients()
      .pipe(takeUntil(this.subscription))
      .subscribe({
        next: (list) => {
          this.ingredientList = list;
        },
      });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  protected openIngredientDialog() {
    const dialogRef = this.dialog.open(IngredientModalComponent);
    // ?
  }

  /**
   * Search through Categories, then through Ingredients to find selected items.
   * @param item Item to select
   */
  // TODO move to Service
  protected onSelect(item: any) {
    // TODO i dont like the way of nested documents, there must be a way for better solution
    for (const category of this.categoryList) {
      for (const ingredient of category.ingredientCategoryRels) {
        if (ingredient.id === item.id) {
          // change state to single item
          this.ingredientDialogService.toggleIngredientSelection(
            ingredient,
            true,
            this.categoryList
          );
          break; // Exit the function after changing state
        }
      }
    }
  }

  protected searchRecipe() {
    const selectedIngredients = this.ingredientDialogService.selectedList;
    const ids = selectedIngredients.map((ingredient) => ingredient.id);

    this.recipeService.findRecipes(ids).subscribe();
  }
}
