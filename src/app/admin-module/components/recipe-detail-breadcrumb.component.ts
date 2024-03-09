import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-detail-breadcrumb',
  template: `
    <span [routerLink]="['/', 'admin', 'dashboard']" class="font-medium underline cursor-pointer"
      >Admin</span
    >
    <span class="ml-3">/</span>
    <span
      [routerLink]="['/', 'admin', 'page']"
      class="ml-3 font-medium underline cursor-pointer"
      >Recipe List</span
    >
    <span class="ml-3">/</span>
    <span class="ml-3">{{ title }}</span>
  `,
  host: {
    '[class]': '["py-3", "block"]',
  },
})
export class RecipeDetailBreadcrumbComponent {
  /** Last item of breadcrumb (leaf) */
  @Input() title!: string;
}
