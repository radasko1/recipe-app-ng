import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../../../shared/services/language-service/language.service';

@Component({
  selector: 'ng-autocomplete',
  template: `
    <div class="block relative w-full">
      <div class="flex rounded-md">
        <input
          #inputElement
          class="block flex-1 w-full p-4 bg-transparent text-gray-900 h-12 outline-2 outline-amber-400 placeholder:text-gray-500"
          [class]="inputClassName"
          [formControl]="inputValue"
          [placeholder]="placeholder"
          [matAutocomplete]="ingredientList"
          tabindex="0"
        />
        <mat-autocomplete #ingredientList="matAutocomplete">
          @for (suggestion of suggestions; track suggestion) {
          <mat-option [value]="suggestion" (click)="select(suggestion)">
            {{ searchProp ? suggestion[searchProp][lang.language] : suggestion }}
          </mat-option>
          }
        </mat-autocomplete>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription = new Subject<boolean>();

  private readonly fb = inject(NonNullableFormBuilder);
  protected readonly lang = inject(LanguageService);

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
  @Input() inputClassName = '';
  /** Focus on input element */
  @Input() autoFocus = false;
  /** On autocomplete suggestion item select */
  @Output() onSelect = this.selected.asObservable();

  @ViewChild('inputElement') protected inputElement: ElementRef | undefined;

  ngOnInit() {
    // Listen changes in form control input
    this.inputValue.valueChanges
      .pipe(takeUntil(this.subscription))
      .subscribe((value) => this.onSearch(value));
  }

  ngAfterViewInit() {
    if (!this.inputElement) {
      return;
    }
    if (this.autoFocus) {
      this.inputElement.nativeElement.focus();
    }
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

    // todo lang? not dynamic use-case
    const prop = this.searchProp;
    this.suggestions = this.list.filter((item) => item[prop][lang].includes(searchedText));
  }

  /**
   * Selected option from Autocomplete
   * @param selectedOption
   */
  protected select(selectedOption: any) {
    if (!selectedOption) {
      return;
    }
    this.selected.next(selectedOption);
    this.inputValue.reset();
  }
}
