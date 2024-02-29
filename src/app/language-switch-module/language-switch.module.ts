import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageSwitchComponent } from './component/language-switch.component';

@NgModule({
  declarations: [LanguageSwitchComponent],
  imports: [MatMenuModule],
  exports: [LanguageSwitchComponent],
})
export class LanguageSwitchModule {}
