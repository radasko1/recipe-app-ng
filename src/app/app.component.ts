import { Component } from '@angular/core';
import locale from './app.locale.json';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  template: `
    <!--navigation-->
    <nav class="bg-white border-gray-200 border-b-[1px]">
      <div class="container py-4 flex flex-wrap items-center justify-between">
        <!--logo-->
        <img src="../assets/logo.png" class="select-none pointer-events-none max-w-[8rem]" />
        <!--links-->
        <div class="flex items-center justify-between w-full md:flex md:w-auto">
          <ul class="flex font-medium p-4">
            <li>
              <a
                routerLink="/"
                class="block py-2 px-3 md:p-0 rounded text-gray-500 hover:text-black"
              >
                {{ locale[languageService.language].Home }}
              </a>
            </li>
            <li class="ml-8">
              <a
                routerLink="/search"
                class="block py-2 px-3 md:p-0 rounded text-gray-500 hover:text-black"
              >
                {{ locale[languageService.language].Search }}
              </a>
            </li>
          </ul>
        </div>
        <!--lang-->
        <app-language-switch />
      </div>
    </nav>
    <!-- content -->
    <main class="relative block container">
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  protected readonly locale = locale;

  constructor(protected readonly languageService: LanguageService) {}
}
