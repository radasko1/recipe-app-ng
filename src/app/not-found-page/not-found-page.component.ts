import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizationModule } from '../localization-module/localization.module';
import { LanguageService } from '../shared/services/language-service/language.service';
import locale from './not-found-page.locale.json';

@Component({
  selector: 'page-not-found',
  standalone: true,
  template: `
    <div class="py-10 mx-14">
      <h1 class="text-4xl font-semibold mb-8 text-center">
        {{ locale | translate: 'Title' : lang.language }}
      </h1>
      <p class="block description text-center font-medium text-xl mb-10">
        {{ locale | translate: 'Description' : lang.language }}
      </p>
      <div class="block text-center">
        <!--@router-->
        <a routerLink="/" class="button-primary" rel="noreferrer noopener">
          {{ locale | translate: 'Button' : lang.language }}
        </a>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LocalizationModule],
})
export class NotFoundPageComponent {
  protected readonly locale = locale;

  constructor(protected readonly lang: LanguageService) {}
}
