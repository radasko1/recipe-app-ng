import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DataCollectionSource } from '../models/data-collection-source.interface';
import { DataCollectionService } from '../services/data-collection.service';
import { LanguageService } from '../../shared/services/language-service/language.service';
import locale from '../admin.locale.json';

@Component({
  selector: 'app-source-detail',
  template: `
    <ng-container *ngIf="sourceDetail as source">
      <!--TODO component?-->
      <app-admin-breadcrumb
        [list]="[
          { label: 'Dashboard', link: '/admin/dashboard' },
          { label: locale[langService.language].SourceList, link: '/admin/source' },
          { label: source.origin, link: null }
        ]"
      />
      <div class="py-9">
        <!--header-->
        <div class="header">
          <h2 class="text-4xl font-medium mb-4">{{ source.origin }}</h2>
          <!--link-->
          <div class="inline-flex items-center">
            <mat-icon fontIcon="link" class="text-blue-400"></mat-icon>
            <a [href]="source.url" target="_blank" rel="noreferrer noopener" class="ml-3 underline">
              {{ locale[langService.language].GoToPage }}
            </a>
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
          <!---->
          <div class="block">
            <label for="config" class="block font-medium mb-1 text-black">
              {{ locale[langService.language].Config }}
            </label>
            <textarea
              id="config"
              rows="10"
              cols="70"
              class="block rounded border outline-none leading-tight appearance-none p-3"
              >{{ source.config | json }}</textarea
            >
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export class SourceDetailComponent implements OnInit, OnDestroy {
  private subs = new Subject<boolean>();
  private paramId: number | undefined;
  protected sourceDetail: DataCollectionSource | undefined;
  protected readonly locale = locale;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService,
    protected readonly langService: LanguageService
  ) {}

  ngOnInit() {
    const routeParam = this.router.snapshot.params;
    const detailId = routeParam['id']; // parseInt(routeParam['id'], 10);
    this.paramId = detailId;

    this.dataCollectionService
      .getDataCollectionSourceDetail(detailId)
      .pipe(takeUntil(this.subs))
      .subscribe((response) => {
        this.sourceDetail = response;
      });
  }

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }
}
