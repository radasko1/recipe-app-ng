import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

type Breadcrumb = {
  label: string;
  link: string | null;
};

/** Used only in AdminModule, but if wanted on more places, then need to be separated module-component */
@Component({
  selector: 'ng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  host: {
    '[class]': '["py-3", "block"]',
  },
  standalone: true,
  imports: [SharedModule, RouterModule],
})
export class BreadcrumbComponent {
  @Input() pageList: Breadcrumb[] = [];
}
