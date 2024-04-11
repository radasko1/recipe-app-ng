import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { CheckboxListService } from '../../models/checkbox-list-service.interface';
import locale from './checkbox-list.locale.json';

@Component({
  selector: 'app-recipe-detail-checkbox-list',
  template: `
    <ul>
      @for (item of list; track item; let idx = $index) {
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
          (click)="remove(list, idx)"
        ></mat-icon>
      </li>
      }
    </ul>
    <ng-autocomplete
      *ngIf="showAutocomplete && autocompleteList && autocompleteList.length"
      inputClassName="rounded border"
      [list]="autocompleteList"
      searchProp="locale"
      [placeholder]="locale[langService.language]['IngredientName']"
      (onSelect)="select(list, $event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxListComponent<ListType, AutocompleteType> {
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

  protected readonly locale = locale;

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
