import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { APP_PAGE_TITLE } from '../../../../app.settings';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { SearchPageHelperService } from '../../services/search-page-helper.service';
import locale from './search.locale.json';

@Component({
  selector: 'app-search-page',
  template: `
    <!--TODO split recipe list and header + search bar-->
    <!--page container-->
    <div class="py-5 md:py-10 mx-auto max-w-[1020px]">
      <h2 class="font-bold text-3xl md:text-5xl text-center">
        {{ locale[langService.language].FindRecipes }}
      </h2>
      <div class="my-4 md:my-8">
        <p class="text-center mb-2">{{ locale[langService.language].SearchText1 }}</p>
        <p class="text-center">
          <span>{{ locale[langService.language].SearchText2 }}</span>
          <span (click)="searchBarFocus()" class="cursor-pointer underline">{{
            locale[langService.language].SearchText3
          }}</span>
          <span>{{ locale[langService.language].SearchText4 }}</span>
          <span (click)="openDialog()" class="cursor-pointer underline"
            >{{ locale[langService.language].SearchText5 }}.</span
          >
        </p>
      </div>
      <!--Search bar-->
      <app-search-bar />
      <!-- Recipes -->
      <app-recipe />
    </div>
  `,
})
export class SearchPageComponent {
  protected readonly locale = locale;
  protected readonly langService = inject(LanguageService);
  private readonly helperService = inject(SearchPageHelperService);

  constructor(readonly title: Title) {
    title.setTitle(APP_PAGE_TITLE.SEARCH[this.langService.language]);
  }

  protected searchBarFocus() {
    this.helperService.onElementFocus.next();
  }

  protected openDialog() {
    this.helperService.onDialogOpen.next();
  }
}
