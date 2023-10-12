import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SearchBarComponent } from './components/search-bar.component';
import { DataService } from '../../services/data.service';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [ReactiveFormsModule, CommonModule, FormsModule, AutocompleteModule],
  exports: [SearchBarComponent],
  providers: [DataService],
})
export class SearchBarModule {}
