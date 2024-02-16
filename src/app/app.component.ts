import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="relative block">
      <!--navigation-->
      <nav>
        <app-language-switch />
      </nav>
      <!-- content -->
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
