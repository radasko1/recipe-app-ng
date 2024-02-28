import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';

import { AutocompleteComponent } from './components/autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [ReactiveFormsModule, MatAutocomplete, MatOption, MatAutocompleteTrigger],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
