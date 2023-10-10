import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AppService } from '../../../services/app.service';
import { Ingredient } from '../../../models/ingredient.interface';
import { LanguageService } from '../../../services/app-language.service';
import locale from './search-bar.locale.json';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();
  /** Localization texts */
  protected readonly locale = locale;

  /** List of ingredients */
  protected ingredientList: Ingredient[] = [];
  /** Autocomplete search value */
  protected searchTerm = this.fb.control<string>('');
  /** Autocomplete suggestions */
  protected suggestions: Ingredient[] = [];
  /** */
  protected selectedList: Ingredient[] = [];

  constructor(
    private appService: AppService,
    protected langService: LanguageService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit() {
    this.appService
      .getIngredients()
      .pipe(takeUntil(this.subscription))
      .subscribe({
        next: (data) => {
          this.ingredientList = data;
        },
      });

    // Listen changes in form control input
    this.searchTerm.valueChanges.pipe(takeUntil(this.subscription)).subscribe({
      next: (value) => this.onSearch(value),
    });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  /**
   * Add ingredient among selected ingredients from autocomplete dropdown
   * @param item
   * @param nextState
   */
  protected onSuggestionClick(item: Ingredient, nextState: boolean) {
    // when I click on ingredient chip or select it from autocomplete
    // the specific ingredient will toggle 'selected' property
    // so I know, what is chosen

    // categoryList and ingredientList are different things
    item.selected = nextState;
    this.selectedList = this.ingredientList.filter((obj) => obj.selected);

    this.searchTerm.reset();
    this.suggestions = [];
  }

  /**
   * Handler for autocomplete search
   * @param searchTerm
   */
  protected onSearch(searchTerm: string) {
    if (!searchTerm) {
      return;
    }

    this.suggestions = this.ingredientList.filter((ing) =>
      ing.locale[this.langService.language].includes(searchTerm)
    );
  }
}
