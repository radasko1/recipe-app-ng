import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SearchBarComponent } from './components/search-bar.component';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  exports: [SearchBarComponent],
  providers: [],
})
export class SearchBarModule {}
