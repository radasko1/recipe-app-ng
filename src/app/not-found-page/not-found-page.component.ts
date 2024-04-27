import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalizationModule } from '../localization-module/localization.module';
import { LanguageService } from '../shared/services/language-service/language.service';
import locale from './not-found-page.locale.json';

@Component({
  selector: 'page-not-found',
  standalone: true,
  templateUrl: 'not-found-page.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, LocalizationModule],
})
export class NotFoundPageComponent {
  protected readonly locale = locale;
  protected readonly lang = inject(LanguageService);
}
