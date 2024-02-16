import { Component } from '@angular/core';

import { LanguageService } from './services/language.service';
import { Language } from './types/language.type';
import locale from './app.locale.json';

@Component({
  selector: 'app-root',
  template: `
    <div class="relative block">
      <!--navigation-->
      <nav class="">
        <!-- LOGO -->
        <!-- TODO Component -->
        <div class="mx-14 py-4 flex items-center justify-end">
          <button
            type="button"
            class="text-sm font-medium rounded px-2 py-1"
            [ngClass]="{ 'bg-gray-950 text-gray-100': langService.language === 'en' }"
            (click)="changeLanguage('en')"
          >
            {{ locale[langService.language].English }}
          </button>
          <button
            type="button"
            class="text-sm font-medium rounded px-2 py-1"
            [ngClass]="{ 'bg-gray-950 text-gray-100': langService.language === 'cs' }"
            (click)="changeLanguage('cs')"
          >
            {{ locale[langService.language].Czech }}
          </button>
        </div>
      </nav>

      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  protected readonly locale = locale;

  constructor(protected readonly langService: LanguageService) {}

  /**
   * Change current language
   * @param lang
   */
  protected changeLanguage(lang: Language) {
    this.langService.language = lang;
  }
}
