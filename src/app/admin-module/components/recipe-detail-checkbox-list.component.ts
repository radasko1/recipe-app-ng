import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageObject } from '../../language-switch-module/models/language-object.type';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { CheckboxListService } from '../models/checkbox-list-service.interface';

/** Localized text collection */
const LOCALE_TEXT: LanguageObject = {
  cs: {
    IngredientName: 'Název suroviny',
  },
  en: {
    IngredientName: 'Ingredient name',
  },
};

@Component({
  selector: 'app-recipe-detail-checkbox-list',
  template: `
    <ul>
      @for (item of list; track item; let i = $index) {
      <li class="flex flex-row items-center justify-between">
        <!--Use default item from list, or change it with service-->
        <ng-template [ngIf]="dataService">
          <mat-checkbox>{{ dataService.getLabel(item) }}</mat-checkbox>
        </ng-template>
        <ng-template [ngIf]="!dataService">
          <mat-checkbox>{{ item }}</mat-checkbox>
        </ng-template>
        <mat-icon
          aria-hidden="false"
          aria-label="Delete"
          fontIcon="delete"
          class="cursor-pointer text-red-600"
          (click)="remove(list, i)"
        ></mat-icon>
      </li>
      }
    </ul>
    <ng-autocomplete
      *ngIf="showAutocomplete && autocompleteList && autocompleteList.length"
      [list]="autocompleteList"
      searchProp="locale"
      [placeholder]="LOCALE_TEXT[langService.language]['IngredientName']"
      (onSelect)="select(list, $event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailCheckboxListComponent<ListType, AutocompleteType> {
  /** Type of items inside list */
  @Input({ required: true }) list!: ListType[];
  /** Show autocomplete component */
  @Input() showAutocomplete = false;
  /** Definition of item inside autocomplete list */
  @Input() autocompleteList: AutocompleteType[] | undefined;
  /**
   * Service providing all possible settings for each component instance.
   * Primary usage is function which get item from list to show in checkbox.
   */
  @Input() dataService: CheckboxListService | undefined;

  protected readonly LOCALE_TEXT = LOCALE_TEXT;

  constructor(protected readonly langService: LanguageService) {}

  /**
   * Remove item from array based on index
   * @param sourceArray
   * @param index
   */
  protected remove(sourceArray: ListType[], index: number) {
    if (index < 0) {
      return;
    }
    sourceArray.splice(index, 1);
  }

  /**
   * Autocomplete option select handler.
   * Push selected item inside specified array
   * @param array
   * @param item
   */
  protected select(array: ListType[], item: any) {
    if (!Array.isArray(array)) {
      return;
    }
    if (!item) {
      return;
    }
    array.push(item);
  }
}
