import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APP_PAGE_TITLE } from '../../app.settings';
import { LocaleFileKey } from '../../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../../localization-module/services/general-locale.token';
import { LanguageService } from '../../shared/services/language-service/language.service';
import locale from './homepage.locale.json';

@Component({
  selector: 'app-homepage',
  template: `
    <!--promo text-->
    <div class="py-9 md:mx-14">
      <h2 class="text-4xl font-semibold mb-1">
        {{ locale | translate: 'PromoText1' : langService.language }}
      </h2>
      <h2 class="text-4xl font-semibold">
        {{ locale | translate: 'PromoText2' : langService.language }}
      </h2>
      <div class="mt-6">
        <!--@router-->
        <button type="button" class="button-primary mr-2 mb-2" routerLink="/search">
          {{ locale | translate: 'Button' : langService.language }}
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  protected readonly locale = locale;

  constructor(
    protected readonly langService: LanguageService,
    @Inject(GeneralLocale) protected generalLocale: LocaleFileKey,
    readonly title: Title
  ) {
    title.setTitle(APP_PAGE_TITLE.HOMEPAGE[this.langService.language]);
  }
}
