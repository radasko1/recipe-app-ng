import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { SharedModule } from '../../shared/shared.module';
import { LocalizationDialogComponent } from './components/localization-dialog/localization-dialog.component';
import { NumberFieldComponent } from './components/number-field/number-field.component';
import { TextDataFieldComponent } from './components/text-data-field/text-data-field.component';

@NgModule({
  declarations: [TextDataFieldComponent, NumberFieldComponent, LocalizationDialogComponent],
  imports: [SharedMaterialModule, SharedModule],
  exports: [TextDataFieldComponent, NumberFieldComponent],
})
export class DataCollectionModule {}
