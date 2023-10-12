import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DataService } from '../../../services/data.service';
import { Ingredient } from '../../../models/ingredient.interface';
import { LanguageService } from '../../../services/app-language.service';
import locale from './search-bar.locale.json';
import { IngredientCategory } from '../../../models/ingredient-category.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();
  /** Localization texts */
  protected readonly locale = locale;
  protected categoryList: IngredientCategory[] = [];

  /** List of ingredients */
  protected ingredientList: Ingredient[] = [];
  /** */
  protected isModalActive = false;

  constructor(
    protected langService: LanguageService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService
      .getIngredients()
      .pipe(takeUntil(this.subscription))
      .subscribe({
        next: (data) => {
          this.ingredientList = data;
        },
      });

    // Get ingredient categories
    this.dataService
      .getCategories()
      .pipe(takeUntil(this.subscription))
      .subscribe({
        next: (data) => {
          this.categoryList = data;
        },
      });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  /** Select item */
  protected onSelect(item: any) {
    console.log('item:', item);
  }

  protected select(item: Ingredient) {
    item.selected = !item.selected;
  }
}
