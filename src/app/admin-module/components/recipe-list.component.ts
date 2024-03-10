import { Component } from '@angular/core';
import { DataCollectionService } from '../services/data-collection.service';

@Component({
  selector: 'app-recipe-list',
  template: `
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <!---->
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Recept</th>
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
              <!--status-->
              <td class="px-6 py-4">
                <span
                  *ngIf="!item.checked && !item.approved"
                  class="rounded-lg inline-block px-2 py-1 text-xs font-medium select-none bg-blue-500 text-white"
                  >created</span
                >
                <span
                  *ngIf="item.checked && !item.approved"
                  class="rounded-lg inline-block px-2 py-1 text-xs font-medium select-none bg-amber-500 text-white"
                  >checked</span
                >
                <span
                  *ngIf="item.checked && item.approved"
                  class="rounded-lg inline-block px-2 py-1 text-xs font-medium select-none bg-green-500 text-white"
                  >approved</span
                >
              </td>
              <!--detail-->
              <td class="px-6 py-4">
                <a
                  [routerLink]="['/', 'admin', 'page', item.id]"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >Detail</a
                >
              </td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
})
export class RecipeListComponent {
  protected readonly dataCollection$ = this.dataCollectionService.getDataCollectionPageList();

  constructor(private readonly dataCollectionService: DataCollectionService) {}
}
