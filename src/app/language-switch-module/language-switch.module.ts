import { NgModule } from '@angular/core';
import { SharedMaterialModule } from "../shared/shared-material.module";
import { LanguageSwitchComponent } from './component/language-switch.component';

@NgModule({
  declarations: [LanguageSwitchComponent],
  imports: [SharedMaterialModule],
  exports: [LanguageSwitchComponent],
})
export class LanguageSwitchModule {}
