import { Component, Input } from '@angular/core';

type Breadcrumb = {
  label: string;
  link: string | null;
};

/** Used only in AdminModule, but if wanted on more places, then need to be separated module-component */
@Component({
  selector: 'app-admin-breadcrumb',
  template: `
    <ng-template [ngIf]="list && list.length">
      @for (item of list; track item; let last = $last) {
      <!--page link-->
      <div
        [routerLink]="item.link"
        class="inline-block font-medium"
        [class.underline]="item.link"
        [class.cursor-pointer]="item.link"
      >
        {{ item.label }}
      </div>
      <!--page divider-->
      <div *ngIf="!last" class="inline-block mx-3">/</div>
      }
    </ng-template>
  `,
  host: {
    '[class]': '["py-3", "block"]',
  },
})
export class BreadcrumbComponent {
  @Input() list: Breadcrumb[] = [];
}
