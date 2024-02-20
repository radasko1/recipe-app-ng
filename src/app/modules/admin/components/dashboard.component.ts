import { Component } from '@angular/core';
import { DataCollectionService } from '../services/data-collection.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <!---->
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Recept</th>
            <th scope="col" class="px-6 py-3">Ingredience</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3">Akce</th>
          </tr>
        </thead>
        <!---->
        <tbody>
          <ng-container *ngIf="dataCollection$ | async as collection">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              *ngFor="let item of collection"
            >
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <a [href]="item.page_url" rel="noreferrer noopener" target="_blank">
                  {{ item.page_data.title }}
                </a>
              </th>
              <td class="px-6 py-4">
                <span *ngFor="let ingredient of item.page_data.ingredients; last as is_last">
                  {{ ingredient + (is_last ? '' : ',') }}
                </span>
              </td>
              <!--status-->
              <td class="px-6 py-4">Laptop</td>
              <!--detail-->
              <td class="px-6 py-4"><a [routerLink]="['/admin/detail', item.id]">Detail</a></td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
})
export class DashboardComponent {
  protected readonly dataCollection$ = this.dataCollectionService.getDataCollectionList();

  constructor(private readonly dataCollectionService: DataCollectionService) {}
}
