import { Component, ViewEncapsulation } from '@angular/core';
import locale from './app.locale.json';
import { APPLICATION_NAME } from './app.settings';

@Component({
  selector: 'app-root',
  template: `
    <!--navigation-->
    <nav class="bg-white border-gray-200 border-b-[1px] shadow-sm fixed w-full z-10 top-0">
      <div class="container px-2 py-4 flex flex-wrap items-center justify-between">
        <!--logo-->
        <a
          routerLink="/"
          class="block rounded text-gray-500 hover:text-black"
          rel="noreferrer noopener"
        >
          <img
            src="../assets/logo.png"
            class="select-none pointer-events-none max-w-[5rem]"
            [alt]="APPLICATION_NAME"
          />
        </a>
        <!--lang-->
        <app-locale-change />
      </div>
    </nav>
    <!-- content -->
    <main class="relative block px-2 mt-20 main-height">
      <router-outlet></router-outlet>
    </main>
    <!-- footer-->
    <footer class="bg-sky-900 text-white py-2 text-center font-medium">2024</footer>
  `,
  styles: ['.main-height { min-height: calc(100vh - 5rem - 2rem); }'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  protected readonly locale = locale;
  protected readonly APPLICATION_NAME = APPLICATION_NAME;
}
