import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { NonNullableFormBuilder } from '@angular/forms';

import { LanguageService } from '../../../../services/language.service';
import { Ingredient } from '../../models/ingredient.interface';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'ng-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();

  /** List of objects/items for suggestion */
  private list: Ingredient[] = [];
  /** Autocomplete search value */
  protected inputValue = this.fb.control<string>('');
  /** Autocomplete suggestion */
  protected suggestions: any[] = [];
  /** On autocomplete item select */
  protected selected = new BehaviorSubject<any | null>(null);

  /** Property for searching through objects in suggestions */
  @Input() searchProp: string | undefined;
  /** Placeholder text */
  @Input() placeholder = '';
  /** On autocomplete suggestion item select */
  @Output() onSelect = this.selected.asObservable();

  constructor(
    private readonly fb: NonNullableFormBuilder,
    protected readonly lang: LanguageService,
    private readonly ingredientService: IngredientService
  ) {}

  ngOnInit() {
    // Listen changes in form control input
    this.inputValue.valueChanges.pipe(takeUntil(this.subscription)).subscribe({
      next: (value) => this.onSearch(value),
    });
    this.ingredientService
      .getList()
      .pipe(takeUntil(this.subscription))
      .subscribe({
        next: (ing) => {
          this.list = ing;
        },
      });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  /**
   * Search through list and create autocomplete suggestions
   * @param searchedText Input value for search
   */
  protected onSearch(searchedText: string) {
    const lang = this.lang.language;

    this.suggestions = this.list.filter((item) => {
      return item.locale[lang].includes(searchedText);
    });
  }

  /**
   * Select item from suggestion
   * @param item Selected item
   */
  protected select(item: Ingredient) {
    this.selected.next(item);
    this.inputValue.reset();
    this.suggestions = [];
  }
}
