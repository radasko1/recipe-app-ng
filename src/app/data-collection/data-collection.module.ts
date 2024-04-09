import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataFieldComponent } from './components/data-field/data-field.component';
import { LocalizationDialogComponent } from './components/localization-dialog/localization-dialog.component';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DataFieldComponent, LocalizationDialogComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedMaterialModule, SharedModule],
  exports: [DataFieldComponent],
})
export class DataCollectionModule {}
