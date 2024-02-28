import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitchComponent } from './language-switch.component';

@NgModule({
  declarations: [LanguageSwitchComponent],
  imports: [CommonModule],
  exports: [LanguageSwitchComponent],
})
export class LanguageSwitchModule {}
