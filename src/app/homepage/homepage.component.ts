import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { APP_PAGE_TITLE } from '../app.settings';
import { LocalizationModule } from '../localization-module/localization.module';
import { LocaleFileKey } from '../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../localization-module/services/general-locale.token';
import { LanguageService } from '../shared/services/language-service/language.service';
import locale from './homepage.locale.json';

@Component({
  selector: 'page-homepage',
  standalone: true,
  imports: [LocalizationModule, RouterLink],
  templateUrl: './homepage.component.html',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  protected readonly generalLocale: LocaleFileKey = inject(GeneralLocale);
  protected readonly langService = inject(LanguageService);
  protected readonly locale = locale;

  constructor(readonly title: Title) {
    title.setTitle(APP_PAGE_TITLE.HOMEPAGE[this.langService.language]);
  }
}
