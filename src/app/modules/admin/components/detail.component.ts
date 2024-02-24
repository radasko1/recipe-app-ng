import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { DataCollectionService } from '../services/data-collection.service';
import { IngredientService } from '../../search/services/ingredient.service';
import { Ingredient } from '../../search/models/ingredient.interface';
import { LanguageService } from '../../../services/language.service';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';

@Component({
  selector: 'app-detail',
  template: `
    <ng-container *ngIf="dataCollectionDetail as dataCollection">
      <div class="container my-3">
        <h2 class="text-4xl font-medium">{{ dataCollection.title }}</h2>
        <p>Odkaz: {{ dataCollection.url }}</p>

        <div class="mt-8">
          <h3 class="text-2xl font-medium mt-0 mb-2">Ingredience uvedene v receptu</h3>
          <p>Seznam ingredienci ziskanych z clanku</p>
          <div class="gap-2 flex flex-wrap">
            <span
              *ngFor="let articleIngredient of dataCollection.ingredients"
              class="rounded-lg inline-flex px-2 py-1 text-xs font-medium border-transparent border-0 outline-0 mb-0 select-none text-gray-900 bg-gray-100"
            >
              {{ articleIngredient }}
            </span>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="text-2xl font-medium mt-0 mb-2">Nalezene ingredience pro recept</h3>
          <p>Seznam ingredienci nalezenych v databazi podle seznamu ingredienci z clanku</p>
          <!--todo add remove icon-->
          <div class="gap-2 flex flex-wrap">
            <span
              *ngFor="let ingredient of suggestedIngredients; index as ingredientI"
              class="cursor-pointer rounded-lg inline-flex px-2 py-1 text-xs font-medium border-transparent border-0 outline-0 mb-0 select-none text-white bg-blue-400"
              (click)="remove(suggestedIngredients, ingredientI)"
            >
              {{ ingredient.locale[lang] }}
            </span>
            <span
              *ngFor="let ing of ingredientStack; index as ingI"
              class="cursor-pointer rounded-lg inline-flex px-2 py-1 text-xs font-medium border-transparent border-0 outline-0 mb-0 select-none text-white bg-orange-400"
              (click)="remove(ingredientStack, ingI)"
            >
              {{ ing.locale[lang] }}
            </span>
          </div>
        </div>

        <ng-container *ngIf="ingredientList$ | async as list">
          <ng-autocomplete
            [list]="list"
            searchProp="locale"
            placeholder="Search ingredient"
            (onSelect)="select($event)"
          />
        </ng-container>

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
  /** Separated suggested ingredient from detail due edition (add/remove) */
  protected suggestedIngredients: Ingredient[] = [];
  protected ingredientList$ = this.ingredientService.getList();
  protected ingredientStack: Ingredient[] = [];
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
          this.suggestedIngredients = value.suggestedIngredients;
        },
      });
  }

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }

  /** Handler for event whether item from autocomplete is selected
   * @param item Select Ingredient item
   */
  protected select(item: Ingredient | null) {
    if (!item) {
      return;
    }

    this.ingredientStack.push(item);
  }

  /**
   * Remove item from array based on index
   * @param sourceArray
   * @param index
   */
  protected remove(sourceArray: Ingredient[], index: number) {
    sourceArray.splice(index, 1);
  }

  /** */
  protected save() {
    if (!this.paramId) {
      return;
    }

    const addedIngredientsIds = this.ingredientStack.map((ing) => ing.id);
    const suggestedIngredients = this.suggestedIngredients.map((ing) => ing.id);
    const listOfIds = addedIngredientsIds.concat(suggestedIngredients);

    this.dataCollectionService.saveDataCollectionIngredients(this.paramId, listOfIds).subscribe();
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
