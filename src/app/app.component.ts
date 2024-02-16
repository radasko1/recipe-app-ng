import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--navigation-->
    <nav class="bg-gray-800">
      <div class="mx-auto p-4">
        <div class="flex items-center justify-between">
          <!--lang-->
          <app-language-switch />
        </div>
      </div>
    </nav>
    <!-- content -->
    <div class="relative block container mx-auto">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {}
