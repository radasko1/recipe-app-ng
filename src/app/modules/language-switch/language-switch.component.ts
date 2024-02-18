import { Component } from '@angular/core';
import locale from './locale.json';
import { LanguageService } from '../../services/language.service';
import { Language } from './models/language.type';
import { LocaleService } from '../../services/locale.service';

interface LanguageButton {
  code: Language;
  translation: string;
}

@Component({
  selector: 'app-language-switch',
  template: `
    <div>
      <button
        id="lang-button"
        aria-expanded="false"
        aria-haspopup="true"
        data-dropdown-toggle="dropdown-lang"
        type="button"
        class="text-sm font-medium rounded px-2 py-1 bg-gray-950 text-gray-100"
      >
        {{ languageLabel }}
      </button>
    </div>
    <!--dropdown-->
    <div
      id="dropdown-lang"
      class="hidden z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="lang-button"
      tabindex="-1"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li *ngFor="let item of languageConfig">
          <a
            class="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
            (click)="langService.change(item.code)"
          >
            {{ localeService.getLocaleValue(locale, item.translation) }}
          </a>
        </li>
      </ul>
    </div>
  `,
})
export class LanguageSwitchComponent {
  protected readonly locale = locale;
  protected readonly languageConfig: LanguageButton[] = [
    { code: 'cs', translation: 'Czech' },
    { code: 'en', translation: 'English' },
  ];

  constructor(
    protected readonly langService: LanguageService,
    protected readonly localeService: LocaleService
  ) {}

  /** Get translated language label */
  protected get languageLabel() {
    switch (this.langService.language) {
      case 'cs':
        return this.locale['cs'].Czech;
      case 'en':
        return this.locale['en'].English;
    }
  }
}
