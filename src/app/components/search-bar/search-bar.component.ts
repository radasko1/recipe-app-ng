import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DataService } from '../../services/data.service';
import { Ingredient } from '../../models/ingredient.interface';
import { LanguageService } from '../../services/language.service';
import locale from './search-bar.locale.json';
import { IngredientCategory } from '../../models/ingredient-category.interface';

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
    protected langService: LanguageService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // Get ingredient categories
    this.dataService
      .getCategories()
      .pipe(takeUntil(this.subscription))
      .subscribe({
        next: (data) => {
          this.categoryList = data;
          // Get ingredient list from each category
          data.forEach((cat) => {
            const ingredients = cat.ingredientCategoryRels;
            this.ingredientList = [...this.ingredientList, ...ingredients];
          });
        },
      });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  /**
   * Mark ingredient in category mark selected, when user select ingredient from autocomplete
   * @param item
   */
  protected onSelect(item: any) {
    for (let i = 0; i < this.categoryList.length; i++) {
      const category = this.categoryList[i];

      for (let j = 0; j < category.ingredientCategoryRels.length; j++) {
        const ingredient = category.ingredientCategoryRels[j];

        if (ingredient.name === item['name']) {
          this.changeState(item, true);
          break;
        }
      }
    }
  }

  /**
   * Set 'selected' property state
   * @param ing Ingredient
   * @param state New 'selected' state
   */
  protected changeState(ing: Ingredient, state: boolean) {
    ing.selected = state;

    // re-create new selection list
    let selectedList: Ingredient[] = [];
    this.categoryList.forEach((category) => {
      const selected = category.ingredientCategoryRels.filter((ingredient) => ingredient.selected);
      selectedList = [...selectedList, ...selected];
    });
    this.selectedList = selectedList;
  }

  /**
   * On search button click
   */
  protected searchRecipe() {
    this.onSubmit.next(this.selectedList);
  }
}
