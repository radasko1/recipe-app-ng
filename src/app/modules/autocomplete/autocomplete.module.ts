import { NgModule } from '@angular/core';
import { AutocompleteComponent } from './components/autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [ReactiveFormsModule, CommonModule],
  providers: [],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
