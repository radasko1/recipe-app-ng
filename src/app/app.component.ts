import { Component } from '@angular/core';
import locale from './app.locale.json';
import { LanguageService } from './services/language.service';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <!--navigation-->
    <nav class="bg-white border-gray-200 border-b-[1px]">
      <div class="container py-4 flex flex-wrap items-center justify-between">
        <!--logo-->
        <img src="../assets/logo.png" class="select-none pointer-events-none max-w-[8rem]" />
        <!--links-->
        <ul class="flex items-center justify-between w-full md:flex md:w-auto font-medium p-4">
          <li>
            <a routerLink="/" class="block py-2 px-3 md:p-0 rounded text-gray-500 hover:text-black">
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
        <!--lang-->
        <app-language-switch />
        <!--login-->
        <div>
          <a
            *ngIf="!(authenticated | async)"
            class="rounded-lg bg-blue-700 text-white cursor-pointer font-medium py-2 px-3"
            rel="noopener noreferrer"
            [href]="loginPageUrl"
          >
            {{ locale[languageService.language].Login }}
          </a>
          <a
            *ngIf="authenticated | async"
            class="rounded-lg bg-blue-700 text-white cursor-pointer font-medium py-2 px-3"
            rel="noopener noreferrer"
            [href]="logoutUrl"
          >
            Logout
          </a>
        </div>
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
  protected readonly loginPageUrl = environment.LOGIN_PAGE_URL;
  protected readonly logoutUrl = environment.LOGOUT_PAGE_URL;
  protected readonly authenticated = this.authService.isAuthenticated();

  constructor(
    protected readonly languageService: LanguageService,
    protected readonly authService: AuthService
  ) {}
}
