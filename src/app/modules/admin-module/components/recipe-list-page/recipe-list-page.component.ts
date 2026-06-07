import { Component, ViewEncapsulation, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import locale from '../../admin.locale.json';
import recipeLocale from './recipe-list-page.component.locale.json';
import { DataCollection } from '../../models/data-collection.interface';
import { DataCollectionService } from '../../services/data-collection.service';

@Component({
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RecipeListPageComponent {
  private readonly dataCollectionService = inject(DataCollectionService);
  protected readonly langService = inject(LanguageService);

  protected readonly locale = locale;
  protected readonly recipeLocale = recipeLocale;
  protected readonly dataCollection$ = this.dataCollectionService.getDataCollectionPageList();
  protected pageSize = 10; // items per page
  protected pageIndex = 0;
  protected searchTerm = '';
  protected statusFilter: 'all' | 'collected' | 'approved' | 'created' = 'all';

  /**
   * On page change in Paginator
   * @param event
   */
  protected onPage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  protected onSearch(value: string) {
    this.searchTerm = value;
    this.pageIndex = 0;
  }

  protected onStatusFilter(value: 'all' | 'collected' | 'approved' | 'created') {
    this.statusFilter = value;
    this.pageIndex = 0;
  }

  protected statusOf(item: DataCollection): 'collected' | 'approved' | 'created' {
    if (item.recipe_id) {
      return 'created';
    }

    if (item.approved) {
      return 'approved';
    }

    return 'collected';
  }
}
