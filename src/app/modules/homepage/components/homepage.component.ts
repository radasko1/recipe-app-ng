import { Component } from '@angular/core';
import locale from '../locale.json';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-homepage',
  template: `
    <!--promo text-->
    <div class="py-9 mx-14">
      <h2 class="text-4xl font-semibold mb-1">{{ locale[langService.language].PromoText1 }}</h2>
      <h2 class="text-4xl font-semibold">{{ locale[langService.language].PromoText2 }}</h2>
    </div>
    <!--  TODO may be part of Homepage with button to route into /search  -->
  `,
})
export class HomepageComponent {
  protected readonly locale = locale;

  constructor(protected readonly langService: LanguageService) {}
}
