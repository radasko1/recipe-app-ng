import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class SearchPageHelperService {
  /** Handler for autocomplete focus */
  readonly onElementFocus = new EventEmitter<void>();
  /** Handler for dialog open */
  readonly onDialogOpen = new EventEmitter<void>();
}
