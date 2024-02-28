import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';

import { AutocompleteComponent } from './components/autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [ReactiveFormsModule, CommonModule, MatAutocomplete, MatOption, MatAutocompleteTrigger],
  providers: [],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
