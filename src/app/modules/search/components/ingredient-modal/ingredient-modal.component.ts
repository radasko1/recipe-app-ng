import { Component } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { CategoryService } from '../../services/category.service';
import { Ingredient } from '../../models/ingredient.interface';
import { IngredientDialogService } from '../../services/ingredient-dialog.service';
import { IngredientCategory } from '../../models/ingredient-category.interface';

@Component({
  selector: 'app-ingredient-modal',
  template: `
    <div
      class="relative block max-h-[70vh] overflow-y-auto"
      aria-modal="true"
      aria-labelledby="Ingredient Category Select"
    >
      <!--Header-->
      <div class="relative px-8 py-5">
        <!--Close-->
        <div
          [mat-dialog-close]="true"
          class="absolute right-5 top-3 w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <i class="fa-regular fa-circle-xmark fa-2xl"></i>
        </div>
      </div>
      <!-- Content -->
      <ng-container *ngIf="categoryList$ | async as categoryList">
        <div class="relative overflow-y-auto px-8 py-8">
          <div
            *ngFor="let category of categoryList; last as category_last"
            [class.mb-3]="!category_last"
          >
            <h2 class="font-bold text-lg mb-1">{{ category.locale[langService.language] }}</h2>
            <div class="gap-2 flex-wrap flex">
              <span
                *ngFor="let ingredient of category.ingredientCategoryRels"
                role="button"
                class="cursor-pointer rounded-lg inline-flex px-2 py-1 text-xs font-medium border-transparent border-0 outline-0 mb-0 select-none"
                [ngClass]="{
                  'text-amber-50 bg-amber-500': ingredient.selected,
                  'text-gray-900 bg-gray-100': !ingredient.selected
                }"
                (click)="changeState(ingredient, !ingredient.selected, categoryList)"
              >
                {{ ingredient.locale[langService.language] }}
              </span>
            </div>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export class IngredientModalComponent {
  protected readonly categoryList$ = this.categoryService.getCategories();

  constructor(
    protected readonly langService: LanguageService,
    private readonly ingredientDialogService: IngredientDialogService,
    private readonly categoryService: CategoryService
  ) {}

  protected changeState(
    ingredient: Ingredient,
    state: boolean,
    categoryList: IngredientCategory[]
  ) {
    this.ingredientDialogService.toggleIngredientSelection(ingredient, state, categoryList);
  }
}
