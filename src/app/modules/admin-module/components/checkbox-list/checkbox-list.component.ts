import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { CheckboxListService } from '../../models/checkbox-list-service.interface';
import locale from './checkbox-list.locale.json';

@Component({
  selector: 'app-recipe-detail-checkbox-list',
  templateUrl: './checkbox-list.component.html',
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
