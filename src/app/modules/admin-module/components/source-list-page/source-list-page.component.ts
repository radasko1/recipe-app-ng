import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { DataCollectionSource } from '../../models/data-collection-source.interface';
import { DataCollectionService } from '../../services/data-collection.service';
import { SourceDialogComponent } from '../source-dialog/source-dialog.component';
import { SourcePageDialogComponent } from '../source-page-dialog/source-page-dialog.component';
import locale from '../../admin.locale.json';

@Component({
  selector: 'app-source-list-page',
  templateUrl: 'source-list-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SourceListPageComponent {
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
