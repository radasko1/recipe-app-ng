import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '../../shared/shared.module';
import { LocaleChangeComponent } from './components/locale-change/locale-change.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { GeneralLocale } from './services/general-locale.token';
import { LocaleService } from './services/locale.service';
import generalLocale from './general.locale.json';

@NgModule({
  declarations: [LocaleChangeComponent, TranslatePipe],
  imports: [SharedModule, MatMenuModule],
  exports: [LocaleChangeComponent, TranslatePipe],
})
export class LocalizationModule {
  static forRoot(): ModuleWithProviders<LocalizationModule> {
    return {
      ngModule: LocalizationModule,
      providers: [
        LocaleService,
        // General locale texts
        {
          provide: GeneralLocale,
          useValue: generalLocale,
        },
      ],
    };
  }
}
