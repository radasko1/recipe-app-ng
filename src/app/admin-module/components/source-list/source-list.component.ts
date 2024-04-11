import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataCollectionSource } from '../../models/data-collection-source.interface';
import { DataCollectionService } from '../../services/data-collection.service';
import { SourceDialogComponent } from '../source-dialog/source-dialog.component';
import { SourcePageDialogComponent } from '../source-page-dialog/source-page-dialog.component';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import locale from '../../admin.locale.json';

@Component({
  selector: 'app-source-list',
  template: `
    <div class="relative overflow-x-auto">
      <!--breadcrumb-->
      <app-admin-breadcrumb
        [list]="[
          { label: 'Dashboard', link: '/admin/dashboard' },
          { label: locale[langService.language].SourceList, link: null }
        ]"
      />
      <!--content-->
      <h1 class="font-medium text-3xl my-6">{{ locale[langService.language].SourceList }}</h1>
      <div class="my-3 text-right">
        <button
          type="button"
          class="rounded px-4 py-2 bg-blue-700 text-white"
          (click)="addSource()"
        >
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
          <!--TODO empty list?-->
          <ng-container *ngIf="sourceList$ | async as sourceList">
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              *ngFor="let dataSource of sourceList"
            >
              <!--origin-->
              <td class="px-6 py-4">
                {{ dataSource.origin }}
              </td>
              <!--link-->
              <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">
                <a [href]="dataSource.url" rel="noreferrer noopener" target="_blank">
                  {{ dataSource.url }}
                </a>
              </td>
              <!--actions-->
              <td class="px-6 py-4 text-right">
                <a
                  [routerLink]="['/', 'admin', 'source', dataSource.id]"
                  class="inline-block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  rel="noreferrer noopener"
                  >Detail</a
                >
                <div class="inline-block">
                  <button
                    type="button"
                    class="rounded px-4 py-2 bg-blue-700 text-white"
                    (click)="addPageURL(dataSource)"
                  >
                    {{ locale[langService.language].AddPage }}
                  </button>
                </div>
              </td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class SourceListComponent {
  protected readonly locale = locale;
  protected readonly sourceList$ = this.dataCollectionService.getDataCollectionSource();

  constructor(
    protected readonly langService: LanguageService,
    private readonly dataCollectionService: DataCollectionService,
    private readonly dialog: MatDialog
  ) {}

  /**
   * Add new source
   */
  protected addSource() {
    this.dialog.open(SourceDialogComponent);
  }

  /**
   * Open dialog to add new page url to the source
   * @param source
   */
  protected addPageURL(source: DataCollectionSource) {
    this.dialog.open(SourcePageDialogComponent, {
      data: {
        source: source,
      },
    });
  }
}
