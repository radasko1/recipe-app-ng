import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'ng-autocomplete',
  template: `
    <div class="block relative w-full">
      <div class="flex rounded-md">
        <input
          class="block flex-1 w-full p-4 bg-transparent text-gray-900 h-12 outline-0"
          [formControl]="inputValue"
          [placeholder]="placeholder"
        />
      </div>
      <ul
        class="absolute border-2 bg-white left-0 top-27-px overflow-y-auto h-auto max-h-[15rem] w-full shadow-lg"
        [class.hidden]="!suggestions.length"
        [class.block]="suggestions.length"
      >
        <!-- Beware: locale is used fo specific use-case -->
        <li
          *ngFor="let suggestion of suggestions"
          (click)="select(suggestion)"
          class="p-4 cursor-pointer hover:bg-gray-200"
        >
          {{ searchProp ? suggestion[searchProp][lang.language] : suggestion }}
        </li>
      </ul>
    </div>
  `,
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();

  protected isVisible = false;

  /** Autocomplete search value */
  protected inputValue = this.fb.control<string>('');
  /** Autocomplete suggestion */
  protected suggestions: any[] = [];
  /** On autocomplete item select */
  protected selected = new BehaviorSubject<any | null>(null);

  /** List of objects/items for suggestion */
  @Input() list: any[] = [];
  /** Property for searching through objects in suggestions */
  @Input() searchProp: string | number | undefined;
  /** Placeholder text */
  @Input() placeholder = '';
  /** On autocomplete suggestion item select */
  @Output() onSelect = this.selected.asObservable();

  constructor(
    private readonly fb: NonNullableFormBuilder,
    protected readonly lang: LanguageService
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
   * @param searchedText Input value for search
   */
  protected onSearch(searchedText: string) {
    const lang = this.lang.language;

    if (!this.searchProp) {
      this.suggestions = this.list.filter((item) => item.includes(searchedText));
      return;
    }

    // todo lang? not dynamic
    const prop = this.searchProp;
    this.suggestions = this.list.filter((item) => item[prop][lang].includes(searchedText));
  }

  /**
   * Select item from suggestion
   * @param item Selected item
   */
  protected select(item: any) {
    this.selected.next(item);
    this.inputValue.reset();
  }
}
