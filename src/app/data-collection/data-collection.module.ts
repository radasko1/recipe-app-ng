import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LocalizationDialogComponent } from './components/localization-dialog/localization-dialog.component';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { TextDataFieldComponent } from './components/text-data-field/text-data-field.component';

@NgModule({
  declarations: [TextDataFieldComponent, LocalizationDialogComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedMaterialModule, SharedModule],
  exports: [TextDataFieldComponent],
})
export class DataCollectionModule {}
