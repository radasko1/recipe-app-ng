import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { DataCollectionService } from '../services/data-collection.service';
import { DataCollection } from '../models/data-collection.interface';

@Component({
  selector: 'app-detail',
  template: `
    <ng-container *ngIf="dataCollection$ | async as dataCollection">
      <div class="container my-3">
        <h2 class="text-4xl font-medium">{{ dataCollection.page_data.title }}</h2>
        <p>Odkaz: {{ dataCollection.page_url }}</p>

        <h3 class="text-2xl font-medium">Ingredience</h3>
        <ul>
          <li *ngFor="let ingredient of dataCollection.page_data.ingredients">{{ ingredient }}</li>
        </ul>
      </div>
    </ng-container>
  `,
})
export class DetailComponent implements OnInit {
  protected dataCollection$: Observable<DataCollection> | undefined;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService
  ) {}

  ngOnInit() {
    const routeParam = this.router.snapshot.params;
    const detailId = parseInt(routeParam['id'], 10);
    this.dataCollection$ = this.dataCollectionService.getDataCollectionItem(detailId);
  }
}
