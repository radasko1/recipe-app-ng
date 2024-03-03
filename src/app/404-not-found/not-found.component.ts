import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../shared/services/language-service/language.service';
import locale from './not-found.locale.json';

@Component({
  standalone: true,
  selector: 'page-not-found',
  template: `
    <div class="py-9 mx-14">
      <h1 class="text-4xl font-semibold mb-5 text-center">
        {{ locale[langService.language].Title }}
      </h1>
      <p class="text-md block description text-center mb-10">
        {{ locale[langService.language].Description }}
      </p>
      <div class="block text-center">
        <a
          routerLink="/"
          class="cursor-pointer rounded-lg text-sm bg-blue-700 text-white py-2.5 px-5 outline-none"
        >
          {{ locale[langService.language].Button }}
        </a>
      </div>
    </div>
  `,
  imports: [RouterLink],
})
export class NotFoundComponent {
  protected readonly locale = locale;

  constructor(protected readonly langService: LanguageService) {}
}
