import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { Ingredient } from '../../models/ingredient.interface';
import { LanguageService } from '../../../../services/language.service';
import locale from './search-bar.locale.json';
import { IngredientCategory } from '../../models/ingredient-category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();
  /** Localization texts */
  protected readonly locale = locale;

  protected categoryList: IngredientCategory[] = [];
  protected ingredientList: Ingredient[] = [];
  /** */
  protected isModalActive = false;
  protected selectedList: Ingredient[] = [];

  @Output() onSubmit = new EventEmitter<Ingredient[]>();

  constructor(
    protected readonly langService: LanguageService,
    private readonly categoryService: CategoryService
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

  /**
   * Search through Categories, then through Ingredients to find selected items.
   * @param item Item to select
   */
  protected onSelect(item: any) {
    // TODO i dont like the way of nested documents, there must be a way for better solution
    for (const category of this.categoryList) {
      for (const ingredient of category.ingredientCategoryRels) {
        if (ingredient.id === item.id) {
          this.changeState(ingredient, true);
          break; // Exit the function after changing state
        }
      }
    }
  }

  /**
   * Set 'selected' property state
   * @param ingredient Ingredient
   * @param state New 'selected' state
   */
  protected changeState(ingredient: Ingredient, state: boolean) {
    ingredient.selected = state;

    // re-create new selection list above search-bar
    this.selectedList = this.categoryList.reduce((result: Ingredient[], category) => {
      const selected = category.ingredientCategoryRels.filter((ingredient) => ingredient.selected);
      return result.concat(selected); // or [...selectedList, ...selected] for an alternative approach
    }, []);
  }

  /** On search button click */
  protected searchRecipe() {
    // error when list is empty?
    if (!this.selectedList.length) {
      return;
    }

    this.onSubmit.next(this.selectedList);
  }
}
