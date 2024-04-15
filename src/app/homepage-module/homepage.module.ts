import { NgModule } from '@angular/core';
import { LocalizationModule } from "../localization-module/localization.module";
import { HomepageComponent } from './components/homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [HomepageRoutingModule, LocalizationModule],
})
export class HomepageModule {}
