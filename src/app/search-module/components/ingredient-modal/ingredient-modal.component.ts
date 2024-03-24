import { Component, ViewEncapsulation } from '@angular/core';

import { LanguageService } from '../../../shared/services/language-service/language.service';
import { CategoryService } from '../../services/category.service';
import { Ingredient } from '../../models/ingredient.interface';
import { IngredientDialogService } from '../../services/ingredient-dialog.service';
import { IngredientCategory } from '../../models/ingredient-category.interface';
import locale from '../../../shared/general.locale.json';

@Component({
  selector: 'app-ingredient-modal',
  template: `
    <div class="relative block" aria-modal="true" aria-labelledby="Ingredient Category Select">
      <!-- Content -->
      <mat-dialog-content>
        <ng-container *ngIf="categoryList$ | async as categoryList">
          <div
            *ngFor="let category of categoryList; last as category_last"
            [class.mb-6]="!category_last"
          >
            <h2 class="font-bold text-xl text-black mb-2">
              {{ category.locale[langService.language] | titlecase }}
            </h2>
            <div class="gap-2 flex-wrap flex">
              <span
                *ngFor="let ingredient of category.ingredients"
                role="button"
                class="cursor-pointer rounded inline-flex px-2 py-1 text-xs font-medium border-transparent border-0 outline-0 mb-0 select-none"
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
        </ng-container>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button
          type="button"
          mat-dialog-close
          class="rounded text-white bg-black outline-0 py-2 px-4 block text-sm font-medium"
        >
          {{ locale[langService.language].Close }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class IngredientModalComponent {
  protected readonly locale = locale;
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
