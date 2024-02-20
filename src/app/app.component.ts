import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--navigation-->
    <nav class="bg-gray-800">
      <div class="mx-auto p-4 flex flex-wrap items-center justify-between max-w-screen-xl">
        <!--links-->
        <div class="flex items-center justify-between w-full md:flex md:w-auto">
          <ul class="flex font-medium p-4">
            <li>
              <a routerLink="/" class="block py-2 px-3 md:p-0 rounded text-white">Domů</a>
            </li>
            <li class="ml-4">
              <a routerLink="/search" class="block py-2 px-3 md:p-0 rounded text-white">Vyhledat recept</a>
            </li>
          </ul>
        </div>
        <!--lang-->
        <app-language-switch />
      </div>
    </nav>
    <!-- content -->
    <div class="relative block container mx-auto">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
// TODO locale
