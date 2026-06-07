import { Component, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import locale from '../../admin.locale.json';
import { DataCollection } from '../../models/data-collection.interface';
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
  protected searchTerm = '';
  protected statusFilter: 'all' | 'collected' | 'approved' | 'created' = 'all';

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

  protected onSearch(value: string) {
    this.searchTerm = value;
    this.pageIndex = 0;
  }

  protected onStatusFilter(value: 'all' | 'collected' | 'approved' | 'created') {
    this.statusFilter = value;
    this.pageIndex = 0;
  }

  protected filteredCollection(collection: DataCollection[]) {
    const search = this.searchTerm.trim().toLowerCase();

    return collection.filter((item) => {
      const matchesSearch =
        !search ||
        item.page_data.title.toLowerCase().includes(search) ||
        item.page_url.toLowerCase().includes(search);
      const matchesStatus = this.statusFilter === 'all' || this.statusOf(item) === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
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
