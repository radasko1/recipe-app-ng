import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [ReactiveFormsModule, CommonModule],
  providers: [],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
