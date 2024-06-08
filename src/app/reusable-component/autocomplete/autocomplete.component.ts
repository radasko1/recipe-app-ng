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
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'ng-autocomplete',
  templateUrl: './autocomplete.component.html',
  standalone: true,
  imports: [SharedModule, MatAutocompleteModule],
})
export class AutocompleteComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription = new Subject<boolean>();
  // services
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
    // Focus on input field to start writing when component is loaded
    if (this.inputElement && this.autoFocus) {
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
    if (!this.searchProp) {
      this.suggestions = this.list.filter((item) => item.includes(searchedText));
      return;
    }

    const lang = this.lang.language;

    // todo lang? not dynamic use-case - for dynamic use case should be there service, which has method to filter property from nested object
    const prop = this.searchProp;
    this.suggestions = this.list.filter((item) => item[prop][lang].includes(searchedText));
  }

  /**
   * Selected option from Autocomplete
   * @param selectedOption
   */
  protected onSelectOption(selectedOption: unknown) {
    if (!selectedOption) {
      return;
    }
    this.selected.next(selectedOption);
    this.inputValue.reset();
  }
}
