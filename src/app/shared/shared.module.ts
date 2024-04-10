import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalizedTitlePipe } from './pipes/localized-title.pipe';

@NgModule({
  declarations: [LocalizedTitlePipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, LocalizedTitlePipe],
  providers: [],
})
export class SharedModule {}
