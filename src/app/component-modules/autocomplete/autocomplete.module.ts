import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../shared/shared-material.module';

import { AutocompleteComponent } from './components/autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [ReactiveFormsModule, SharedMaterialModule],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
