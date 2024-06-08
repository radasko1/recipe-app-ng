import { Component, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import locale from '../../admin.locale.json';
import { DataCollectionService } from '../../services/data-collection.service';

@Component({
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RecipeListPageComponent {
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
