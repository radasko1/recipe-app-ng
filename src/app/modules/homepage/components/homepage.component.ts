import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import locale from '../locale.json';
import { LanguageService } from '../../../services/language.service';
import { APP_PAGE_TITLE } from '../../../app.settings';

@Component({
  selector: 'app-homepage',
  template: `
    <!--promo text-->
    <div class="py-9 mx-14">
      <h2 class="text-4xl font-semibold mb-1">{{ locale[langService.language].PromoText1 }}</h2>
      <h2 class="text-4xl font-semibold">{{ locale[langService.language].PromoText2 }}</h2>
      <div class="mt-3">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          routerLink="/search"
        >
          {{ locale[langService.language].Button }}
        </button>
      </div>
    </div>
  `,
})
export class HomepageComponent {
  protected readonly locale = locale;

  constructor(
    protected readonly langService: LanguageService,
    readonly title: Title
  ) {
    title.setTitle(APP_PAGE_TITLE.HOMEPAGE[this.langService.language]);
  }
}
