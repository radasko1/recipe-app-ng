import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
  <div class="relative overflow-x-auto">
    <ul>
      <li><a [routerLink]="['/','admin','page']">Recipe</a></li>
      <li><a [routerLink]="['/','admin','source']">Source</a></li>
    </ul>
  </div>
  `,
})
export class DashboardComponent {
  constructor() {}
}
