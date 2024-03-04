import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { IngredientService } from '../../services/ingredient.service';
import locale from './search-bar.locale.json';
import { IngredientCategory } from '../../models/ingredient-category.interface';
import { CategoryService } from '../../services/category.service';
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
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();
  protected readonly locale = locale;
  protected readonly ingredientList$ = this.ingredientService.getList();
  protected categoryList: IngredientCategory[] = [];

  constructor(
    protected readonly langService: LanguageService,
    protected readonly ingredientDialogService: IngredientDialogService,
    private readonly ingredientService: IngredientService,
    private readonly categoryService: CategoryService,
    private readonly recipeService: RecipeService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    // Get ingredient categories
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.subscription))
      .subscribe((data) => {
        this.categoryList = data;
      });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  protected openIngredientDialog() {
    const dialogRef = this.dialog.open(IngredientModalComponent);
  }

  protected onSelect(item: any) {
    if (!item) {
      return;
    }
    this.ingredientDialogService.ingredientSelect(item, this.categoryList);
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
