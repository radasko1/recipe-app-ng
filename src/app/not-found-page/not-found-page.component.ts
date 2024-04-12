import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../shared/services/language-service/language.service';
import locale from './not-found-page.locale.json';

@Component({
  standalone: true,
  selector: 'page-not-found',
  template: `
    <div class="py-10 mx-14">
      <h1 class="text-4xl font-semibold mb-8 text-center">
        {{ locale[lang.language].Title }}
      </h1>
      <p class="block description text-center font-medium text-xl mb-10">
        {{ locale[lang.language].Description }}
      </p>
      <div class="block text-center">
        <!--@router-->
        <a
          routerLink="/"
          class="cursor-pointer rounded text-sm font-medium bg-blue-700 text-white py-2 px-4 outline-none"
          rel="noreferrer noopener"
        >
          {{ locale[lang.language].Button }}
        </a>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class NotFoundPageComponent {
  protected readonly locale = locale;

  constructor(protected readonly lang: LanguageService) {}
}
