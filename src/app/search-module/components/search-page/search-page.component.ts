import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APP_PAGE_TITLE } from '../../../app.settings';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import locale from './search.locale.json';

@Component({
  selector: 'app-search-page',
  template: `
    <!--page container-->
    <div class="py-5 md:py-10 mx-auto max-w-[1020px]">
      <h2 class="font-bold text-3xl md:text-5xl text-center">
        {{ locale[langService.language].FindRecipes }}
      </h2>
      <div class="my-4 md:my-8">
        <p class="text-center mb-2">{{ locale[langService.language].SearchText1 }}</p>
        <!--TODO after click of underline text, focus on element?-->
        <p class="text-center" [innerHTML]="locale[langService.language].SearchText2"></p>
      </div>
      <!--Search bar-->
      <app-search-bar />
      <!-- Recipes -->
      <app-recipe />
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class SearchPageComponent {
  protected readonly locale = locale;
  protected readonly langService = inject(LanguageService);

  constructor(readonly title: Title) {
    title.setTitle(APP_PAGE_TITLE.SEARCH[this.langService.language]);
  }
}
