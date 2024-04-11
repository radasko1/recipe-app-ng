import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { SharedModule } from '../../shared/shared.module';

import { AutocompleteComponent } from './components/autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [SharedModule, SharedMaterialModule],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
