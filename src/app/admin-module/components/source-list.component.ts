import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { DataCollectionSource } from '../models/data-collection-source.interface';
import { DataCollectionService } from '../services/data-collection.service';
import locale from '../admin.locale.json';
import { SourcePageDialogComponent } from './source-page-dialog.component';

// TODO action to add new page to control?
@Component({
  selector: 'app-source-list',
  template: `
    <div class="relative overflow-x-auto">
      <h1 class="font-medium text-3xl my-6">{{ locale[langService.language].SourceList }}</h1>
      <div class="my-3 text-right">
        <button type="button" class="rounded px-4 py-2 bg-blue-700 text-white">
          {{ locale[langService.language].AddSource }}
        </button>
      </div>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <!---->
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">{{ locale[langService.language].Source }}</th>
            <th scope="col" class="px-6 py-3">{{ locale[langService.language].Link }}</th>
            <th scope="col" class="px-6 py-3 text-right">
              {{ locale[langService.language].Action }}
            </th>
          </tr>
        </thead>
        <!---->
        <tbody>
          <ng-container *ngIf="dataCollection$ | async as collection">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              *ngFor="let item of collection"
            >
              <!--origin-->
              <td class="px-6 py-4">
                {{ item.origin }}
              </td>
              <!--link-->
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <a [href]="item.url" rel="noreferrer noopener" target="_blank">
                  {{ item.url }}
                </a>
              </td>
              <!--actions-->
              <td class="px-6 py-4 text-right">
                <a
                  [routerLink]="['/', 'admin', 'source', item.id]"
                  class="inline-block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >Detail</a
                >
                <div class="inline-block">
                  <button
                    type="button"
                    class="rounded px-4 py-2 bg-blue-700 text-white"
                    (click)="openDialog(item)"
                  >
                    Pridat odkaz
                  </button>
                </div>
              </td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
})
export class SourceListComponent {
  protected readonly locale = locale;
  protected readonly dataCollection$ = this.dataCollectionService.getDataCollectionSource();

  constructor(
    private readonly dataCollectionService: DataCollectionService,
    protected readonly langService: LanguageService,
    private readonly dialog: MatDialog
  ) {}

  protected openDialog(source: DataCollectionSource) {
    this.dialog.open(SourcePageDialogComponent, { data: { sourceId: source.id } });
  }
}
