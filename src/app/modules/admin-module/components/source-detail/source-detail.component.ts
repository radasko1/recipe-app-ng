import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { LocaleFileKey } from '../../../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { DataCollectionSource } from '../../models/data-collection-source.interface';
import { DataCollectionService } from '../../services/data-collection.service';
import locale from '../../admin.locale.json';

@Component({
  selector: 'app-source-detail',
  templateUrl: './source-detail.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SourceDetailComponent implements OnInit, OnDestroy {
  private subs = new Subject<boolean>();
  private paramId: number | undefined;
  protected sourceDetail: DataCollectionSource | undefined;
  protected readonly locale = locale;
  protected config = this.fb.control<string>('', { validators: [Validators.required] });

  constructor(
    @Inject(GeneralLocale) protected generalLocale: LocaleFileKey,
    protected readonly langService: LanguageService,
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService,
    private readonly fb: NonNullableFormBuilder
  ) {}

  ngOnInit() {
    const routeParam = this.router.snapshot.params;
    const detailId = routeParam['id'];
    this.paramId = detailId;

    this.dataCollectionService
      .getDataCollectionSourceDetail(detailId)
      .pipe(takeUntil(this.subs))
      .subscribe((response) => {
        this.sourceDetail = response;
        this.config.setValue(JSON.stringify(response.config));
      });
  }

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }

  /** Save changes of DataSource config setting */
  protected saveChanges() {
    if (this.config.status === 'INVALID') {
      return;
    }
    const id = this.paramId;
    const config = this.config.value;
    if (!id || !config.trim().length) {
      return;
    }
    const parsedConfig = JSON.parse(config);

    this.dataCollectionService.updateDataSource(id, parsedConfig).subscribe();
  }
}
