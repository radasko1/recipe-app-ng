import { Component, ViewEncapsulation, inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import locale from '../../admin.locale.json';
import recipeLocale from './recipe-list-page.component.locale.json';
import { DataCollectionStatus } from '../../models/data-collection-status.type';
import { DataCollectionService } from '../../services/data-collection.service';
import { DataCollection } from '../../models/data-collection.interface';
import { MatDialog } from '@angular/material/dialog';
import { CreateDataCollectionPageDialogComponent } from '../create-data-collection-page-dialog/create-data-collection-page-dialog.component';

@Component({
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrl: 'recipe-list-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class RecipeListPageComponent {
  private readonly dataCollectionService = inject(DataCollectionService);
  protected readonly langService = inject(LanguageService);
  private readonly dialog = inject(MatDialog);

  protected readonly locale = locale;
  protected readonly recipeLocale = recipeLocale;
  protected readonly DataCollectionStatus = DataCollectionStatus;
  protected readonly statusOptions = Object.values(DataCollectionStatus);
  protected dataCollection$ = this.dataCollectionService.getDataCollectionPageList();
  protected pageSize = 10; // items per page
  protected pageIndex = 0;
  protected searchTerm = '';
  protected statusFilter: DataCollectionStatus | 'all' = 'all';

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

  protected onStatusFilter(value: DataCollectionStatus | 'all') {
    this.statusFilter = value;
    this.pageIndex = 0;
  }

  /**
   * Add new recipe page
   */
  protected addNewRecipe() {
    this.dialog.open(CreateDataCollectionPageDialogComponent);
  }

  protected deletePageData(item: DataCollection) {
    this.dataCollectionService.deletePageData(item.id).subscribe(() => {
      this.dataCollection$ = this.dataCollectionService.getDataCollectionPageList();
    });
  }
}
