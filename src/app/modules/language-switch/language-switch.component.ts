import { Component } from '@angular/core';
import locale from './locale.json';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switch',
  template: `
    <div class="mx-14 py-4 flex items-center justify-end">
      <button
        type="button"
        class="text-sm font-medium rounded px-2 py-1"
        [ngClass]="{ 'bg-gray-950 text-gray-100': langService.language === 'en' }"
        (click)="langService.change('en')"
      >
        {{ locale[langService.language].English }}
      </button>
      <button
        type="button"
        class="text-sm font-medium rounded px-2 py-1"
        [ngClass]="{ 'bg-gray-950 text-gray-100': langService.language === 'cs' }"
        (click)="langService.change('cs')"
      >
        {{ locale[langService.language].Czech }}
      </button>
    </div>
  `,
})
export class LanguageSwitchComponent {
  protected readonly locale = locale;

  constructor(protected readonly langService: LanguageService) {}
}
