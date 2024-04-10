import { Component, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { LanguageService } from '../../shared/services/language-service/language.service';
import locale from '../admin.locale.json';
import { DataCollectionService } from '../services/data-collection.service';

@Component({
  selector: 'app-recipe-list',
  template: `
    <div class="relative overflow-x-auto">
      <!--breadcrumb-->
      <app-admin-breadcrumb
        [list]="[
          { label: 'Dashboard', link: '/admin/dashboard' },
          { label: locale[langService.language].RecipeList, link: null }
        ]"
      />
      <!--content-->
      <h1 class="font-semibold text-3xl my-6">{{ locale[langService.language].RecipeList }}</h1>
      <div class="block w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <!---->
        <div class="text-xs text-gray-700 uppercase bg-gray-50">
          <div class="inline-block font-semibold px-6 py-3 w-8/12">Recept (odkaz)</div>
          <div class="inline-block font-semibold px-6 py-3 w-2/12 text-right">Status</div>
          <div class="inline-block font-semibold px-6 py-3 w-2/12 text-right">Akce</div>
        </div>
        <!---->
        <ng-container *ngIf="dataCollection$ | async as collection">
          <div
            class="block border-b"
            *ngFor="
              let item of collection | slice: pageIndex * pageSize : (pageIndex + 1) * pageSize
            "
          >
            <div class="inline-block px-6 py-4 font-medium text-blue-500 underline w-8/12">
              <a [href]="item.page_url" rel="noreferrer noopener" target="_blank">
                {{ item.page_data.title }}
              </a>
            </div>
            <!--status-->
            <div class="inline-block px-6 py-4 w-2/12 text-right">
              <span
                *ngIf="!item.approved && !item.recipe_id"
                class="rounded-lg inline-block px-2 py-1 text-xs font-medium select-none bg-blue-500 text-white"
                >collected</span
              >
              <span
                *ngIf="item.approved && !item.recipe_id"
                class="rounded-lg inline-block px-2 py-1 text-xs font-medium select-none bg-green-500 text-white"
                >approved</span
              >
              <span
                *ngIf="item.recipe_id"
                class="rounded-lg inline-block px-2 py-1 text-xs font-medium select-none bg-red-700 text-white"
                >created</span
              >
            </div>
            <!--detail-->
            <div class="inline-block px-6 py-4 w-2/12 text-right">
              <!--@router-->
              <a
                [routerLink]="['/', 'admin', 'page', item.id]"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-4 py-2 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                rel="noreferrer noopener"
                >Detail</a
              >
            </div>
          </div>
          <!--paginator-->
          <mat-paginator
            #paginator
            [length]="collection.length"
            [pageSize]="pageSize"
            [pageIndex]="pageIndex"
            [pageSizeOptions]="[10, 25, 50]"
            (page)="onPage($event)"
          ></mat-paginator>
        </ng-container>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class RecipeListComponent {
  protected readonly locale = locale;
  protected readonly dataCollection$ = this.dataCollectionService.getDataCollectionPageList();
  protected pageSize = 10; // items per page
  protected pageIndex = 0;

  constructor(
    private readonly dataCollectionService: DataCollectionService,
    protected readonly langService: LanguageService
  ) {}

  /**
   * On page change in Paginator
   * @param event
   */
  protected onPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
