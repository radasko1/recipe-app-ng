import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="relative overflow-x-auto">
      <ul class="flex mt-5">
        <li class="mr-3 w-full">
          <a
            [routerLink]="['/', 'admin', 'page']"
            rel="noreferrer noopener"
            class="bg-blue-300 text-white block p-5 rounded"
            >Recipe</a
          >
        </li>
        <li class="ml-3 w-full">
          <a
            [routerLink]="['/', 'admin', 'source']"
            rel="noreferrer noopener"
            class="bg-blue-300 block text-white p-5 rounded"
            >Source</a
          >
        </li>
      </ul>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {}
