import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DataCollectionSource } from '../../models/data-collection-source.interface';
import { DataCollectionService } from '../../services/data-collection.service';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import locale from '../../admin.locale.json';
import sharedLocale from '../../../shared/general.locale.json';

@Component({
  selector: 'app-source-detail',
  template: `
    <ng-container *ngIf="sourceDetail as source">
    <app-admin-breadcrumb
      [list]="[
          { label: 'Dashboard', link: '/admin/dashboard' },
          { label: locale[langService.language].SourceList, link: '/admin/source' },
          { label: source.origin, link: null }
        ]"
    />
    <div class="py-9">
    <!--header-->
    <div class="header relative">
      <h2 class="text-4xl font-medium mb-4">{{ source.origin }}</h2>
      <!--link-->
      <div class="inline-flex items-center">
        <mat-icon fontIcon="link" class="text-blue-400"></mat-icon>
        <a [href]="source.url" target="_blank" rel="noreferrer noopener" class="ml-3 underline">
          {{ locale[langService.language].GoToPage }}
        </a>
      </div>
      <div class="block md:flex md:justify-end">
        <button
          type="button"
          class="rounded px-4 py-2 border-none outline-none cursor-pointer bg-sky-700 text-white"
          (click)="saveChanges()"
        >
          {{ sharedLocale[langService.language].Save }}
        </button>
      </div>
    </div>
    <!--content-->
    <div class="block mt-10">
      <div class="block mb-6">
        <label for="link" class="block font-medium mb-1 text-black">
          {{ locale[langService.language].Link }}
        </label>
        <input
          id="link"
          type="text"
          [value]="source.url"
          class="block rounded outline-none leading-tight appearance-none p-3"
          disabled
        />
      </div>
      <!--config-->
      <div class="block">
        <label for="config" class="block font-medium mb-1 text-black">
          {{ locale[langService.language].Config }}
        </label>
        <textarea
          id="config"
          rows="10"
          cols="70"
          class="block rounded border outline-none leading-tight appearance-none p-3"
          [formControl]="config"
        >{{ config.value }}</textarea
        >
      </div>
    </div>
    </div>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None
})
export class SourceDetailComponent implements OnInit, OnDestroy {
  private subs = new Subject<boolean>();
  private paramId: number | undefined;
  protected sourceDetail: DataCollectionSource | undefined;
  protected readonly locale = locale;
  protected readonly sharedLocale = sharedLocale;
  protected config = this.fb.control<string>('', { validators: [Validators.required] });

  constructor(
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService,
    private readonly fb: NonNullableFormBuilder,
    protected readonly langService: LanguageService
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
