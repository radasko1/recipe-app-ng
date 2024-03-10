import { Component } from '@angular/core';
import locale from './app.locale.json';
import { LanguageService } from './shared/services/language-service/language.service';

@Component({
  selector: 'app-root',
  template: `
    <!--navigation-->
    <nav class="bg-white border-gray-200 border-b-[1px] shadow-sm">
      <div class="container py-4 flex flex-wrap items-center justify-between">
        <!--logo-->
        <a routerLink="/" class="block rounded text-gray-500 hover:text-black">
          <img
            src="../assets/logo.png"
            class="select-none pointer-events-none max-w-[8rem]"
            alt="Reci-pier"
          />
        </a>
        <!--links-->
        <ul class="flex items-center justify-between md:flex w-auto font-medium md:p-4">
          <li class="">
            <a
              [routerLink]="['/', 'search']"
              class="block py-2 px-3 md:p-0 rounded text-gray-500 hover:text-black"
            >
              {{ locale[languageService.language].Search }}
            </a>
          </li>
        </ul>
        <!--lang-->
        <app-language-switch />
      </div>
    </nav>
    <!-- content -->
    <main class="relative min-h-full block container">
      <router-outlet></router-outlet>
    </main>
    <!-- footer-->
    <footer class="bg-sky-900 text-white py-2 text-center font-medium">
      2024
    </footer>
  `,
})
export class AppComponent {
  protected readonly locale = locale;

  constructor(protected readonly languageService: LanguageService) {}
}
