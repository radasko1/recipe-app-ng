import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  template: `
    <div class="relative overflow-x-auto">
      <ul class="flex mt-5">
        <li class="w-full">
          <!--@router-->
          <a
            [routerLink]="['/', 'admin', 'page']"
            rel="noreferrer noopener"
            class="bg-black text-white block p-5 rounded"
            >Recipe</a
          >
        </li>
        <li class="ml-3 w-full">
          <!--@router-->
          <a
            [routerLink]="['/', 'admin', 'source']"
            rel="noreferrer noopener"
            class="bg-black block text-white p-5 rounded"
            >Source</a
          >
        </li>
        <li class="ml-3 w-full">
          <!--@router-->
          <a
            [routerLink]="['/', 'admin', 'ingredient']"
            rel="noreferrer noopener"
            class="bg-black block text-white p-5 rounded"
            >Ingredient</a
          >
        </li>
      </ul>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AdminDashboardPageComponent {}
