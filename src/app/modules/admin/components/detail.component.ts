import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DataCollectionService } from '../services/data-collection.service';
import { IngredientService } from '../../search/services/ingredient.service';
import { Ingredient } from '../../search/models/ingredient.interface';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';

@Component({
  selector: 'app-detail',
  template: `
    <ng-container *ngIf="dataCollectionDetail as dataCollection">
      <div class="container my-3">
        <h2 class="text-4xl font-medium">{{ dataCollection.title }}</h2>
        <p>Odkaz: {{ dataCollection.url }}</p>

        <!---->
        <div class="flex flex-row -mx-5 mt-10">
          <div class="basis-1/3 px-5">
            <h3 class="text-2xl font-medium">Recept</h3>
            <ul>
              @for (ingredient of dataCollection.ingredients; track ingredient) {
              <li>
                <mat-checkbox>{{ ingredient }}</mat-checkbox>
              </li>
              }
            </ul>
          </div>
          <!---->
          <div class="basis-1/3 px-5">
            <h3 class="text-2xl font-medium">Pozadovane ingredience</h3>
            <ul>
              @for (ingredient of requiredIngredients; track ingredient; let i = $index) {
              <li class="flex flex-row items-center justify-between">
                <mat-checkbox>{{ ingredient.locale[lang] }}</mat-checkbox>
                <mat-icon
                  aria-hidden="false"
                  aria-label="Delete"
                  fontIcon="delete"
                  class="cursor-pointer text-red-600"
                  (click)="remove(requiredIngredients, i)"
                ></mat-icon>
              </li>
              }
            </ul>
            <ng-autocomplete
              [list]="ingredientList"
              searchProp="locale"
              placeholder="Přidat ingredienci"
              (onSelect)="select(requiredIngredients, $event)"
            />
          </div>
          <!---->
          <div class="basis-1/3 px-5">
            <h3 class="text-2xl font-medium">Volitelne ingredience</h3>
            <ul>
              @for (ingredient of optionalIngredients; track ingredient; let i = $index) {
              <li class="flex flex-row items-center justify-between">
                <mat-checkbox>{{ ingredient.locale[lang] }}</mat-checkbox>
                <mat-icon
                  aria-hidden="false"
                  aria-label="Delete"
                  fontIcon="delete"
                  class="cursor-pointer text-red-600"
                  (click)="remove(optionalIngredients, i)"
                ></mat-icon>
              </li>
              }
            </ul>
            <ng-autocomplete
              [list]="ingredientList"
              searchProp="locale"
              placeholder="Přidat ingredienci"
              (onSelect)="select(optionalIngredients, $event)"
            />
          </div>
        </div>

        <div class="mt-5">
          <button
            type="button"
            class="rounded-lg bg-green-700 text-white cursor-pointer font-medium py-2 px-3"
            (click)="approveData()"
          >
            Schvalit
          </button>
          <button
            type="button"
            class="rounded-lg bg-red-700 text-white cursor-pointer font-medium py-2 px-3"
            (click)="deleteData()"
          >
            Vymazat data
          </button>
          <button
            type="button"
            class="rounded-lg bg-blue-700 text-white cursor-pointer font-medium py-2 px-3"
            (click)="save()"
          >
            Ulozit
          </button>
        </div>
      </div>
    </ng-container>
  `,
  providers: [IngredientService],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs = new Subject<boolean>();
  private paramId: number | undefined;
  protected dataCollectionDetail: DataCollectionDetail | undefined;
  protected requiredIngredients: Ingredient[] = [];
  protected optionalIngredients: Ingredient[] = [];
  protected ingredientList: Ingredient[] = [];
  protected readonly lang = this.languageService.language;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService,
    private readonly ingredientService: IngredientService,
    private readonly languageService: LanguageService
  ) {}

  ngOnInit() {
    const routeParam = this.router.snapshot.params;
    const detailId = routeParam['id']; // parseInt(routeParam['id'], 10);
    this.paramId = detailId;

    this.dataCollectionService
      .getDataCollectionDetail(detailId)
      .pipe(takeUntil(this.subs))
      .subscribe({
        next: (value) => {
          this.dataCollectionDetail = value;
          this.requiredIngredients = value.requiredIngredients;
          this.optionalIngredients = value.optionalIngredients;
        },
      });

    this.ingredientService
      .getList()
      .pipe(takeUntil(this.subs))
      .subscribe({
        next: (value) => {
          this.ingredientList = value;
        },
      });
  }

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }

  /**
   * Autocomplete option select handler.
   * Push selected item inside specified array
   * @param array
   * @param item
   */
  protected select(array: any[], item: any) {
    if (!Array.isArray(array)) {
      return;
    }
    if (!item) {
      return;
    }

    array.push(item);
  }

  /**
   * Remove item from array based on index
   * @param sourceArray
   * @param index
   */
  protected remove(sourceArray: Ingredient[], index: number) {
    if (index < 0) {
      return;
    }

    sourceArray.splice(index, 1);
  }

  /** Save Recipe Ingredients for specific Data Collection */
  protected save() {
    if (!this.paramId) {
      return;
    }

    const requiredIngredientList = this.requiredIngredients.map((ing) => ing.id);
    const optionalIngredientList = this.optionalIngredients.map((ing) => ing.id);

    this.dataCollectionService
      .saveDataCollectionIngredients(this.paramId, requiredIngredientList, optionalIngredientList)
      .subscribe();
  }

  /** Delete PageData from DataCollection */
  protected deleteData() {
    if (!this.paramId) {
      return;
    }

    this.dataCollectionService.deletePageData(this.paramId).subscribe();
  }

  /** Approve PageData from DataCollection */
  protected approveData() {
    if (!this.paramId) {
      return;
    }

    this.dataCollectionService.approvePageData(this.paramId).subscribe();
  }
}
