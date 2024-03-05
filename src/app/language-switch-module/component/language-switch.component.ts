import { Component } from '@angular/core';

import locale from '../locale.json';
import { CZECH_LANG, ENGLISH_LANG, Language } from '../models/language.type';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { LocaleService } from '../../shared/services/locale-service/locale.service';

type LanguageButton = {
  code: Language;
  translation: string;
};

@Component({
  selector: 'app-language-switch',
  template: `
    <div>
      <button
        aria-label="Language menu button"
        type="button"
        class="text-sm font-medium rounded px-2 py-1 bg-gray-950 text-gray-100"
        [matMenuTriggerFor]="dropdown"
      >
        {{ languageLabel }}
      </button>
    </div>
    <!--dropdown-->
    <mat-menu
      #dropdown
      class="z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      tabindex="-1"
      xPosition="before"
      yPosition="below"
    >
      <ul class="text-sm text-gray-700 dark:text-gray-200">
        @for (item of languageConfig; track item) {
        <li>
          <a
            class="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
            tabindex="-1"
            (click)="langService.change(item.code)"
          >
            {{ localeService.getLocaleValue(locale, item.translation) }}
          </a>
        </li>
        }
      </ul>
    </mat-menu>
  `,
})
export class LanguageSwitchComponent {
  protected readonly locale = locale;
  protected readonly languageConfig: LanguageButton[] = [
    { code: CZECH_LANG, translation: 'Czech' },
    { code: ENGLISH_LANG, translation: 'English' },
  ];

  constructor(
    protected readonly langService: LanguageService,
    protected readonly localeService: LocaleService
  ) {}

  /** Get translated language label */
  protected get languageLabel() {
    switch (this.langService.language) {
      case CZECH_LANG:
        return this.locale[CZECH_LANG].Czech;
      case ENGLISH_LANG:
        return this.locale[ENGLISH_LANG].English;
    }
  }
}
