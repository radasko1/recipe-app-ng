import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
  <div class="relative overflow-x-auto">
    <ul>
      <li><a [routerLink]="['/','admin','page']" rel="noreferrer noopener">Recipe</a></li>
      <li><a [routerLink]="['/','admin','source']" rel="noreferrer noopener">Source</a></li>
    </ul>
  </div>
  `,
})
export class DashboardComponent {
  constructor() {}
}
