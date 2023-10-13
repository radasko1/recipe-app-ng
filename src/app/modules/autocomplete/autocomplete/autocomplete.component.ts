import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { NonNullableFormBuilder } from '@angular/forms';

import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'ng-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();

  /** Autocomplete search value */
  protected inputValue = this.fb.control<string>('');
  /** Autocomplete suggestion */
  protected suggestions: any[] = [];
  /** On autocomplete item select */
  protected selected = new BehaviorSubject<any | null>(null);

  /** List of objects/items for suggestion */
  @Input() list: any[] = [];
  /** Property for searching through objects in suggestions */
  @Input() searchProp: string | undefined;
  /** Placeholder text */
  @Input() placeholder = '';
  /** On autocomplete suggestion item select */
  @Output() onSelect = this.selected.asObservable();

  constructor(
    private fb: NonNullableFormBuilder,
    protected lang: LanguageService
  ) {}

  ngOnInit() {
    // Listen changes in form control input
    this.inputValue.valueChanges.pipe(takeUntil(this.subscription)).subscribe({
      next: (value) => this.onSearch(value),
    });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  /**
   * Search through list and create autocomplete suggestions
   * @param value Input value for search
   */
  protected onSearch(value: string) {
    this.suggestions = this.list.filter((item: any) => {
      if (!this.searchProp) {
        return item.includes(value);
      }

      const prop = this.searchProp;
      // Beware: this is done for specific use-case
      return item[prop][this.lang.language].includes(value);
    });
  }

  /**
   * Select item from suggestion
   * @param item Selected item
   */
  protected select(item: any) {
    this.selected.next(item);
    this.inputValue.reset();
    this.suggestions = [];
  }
}
