import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--navigation-->
    <nav class="container mx-auto">
      <app-language-switch />
    </nav>
    <!-- content -->
    <div class="relative block container mx-auto">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
