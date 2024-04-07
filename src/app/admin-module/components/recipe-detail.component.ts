import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Ingredient } from '../../search-module/models/ingredient.interface';
import { IngredientService } from '../../search-module/services/ingredient.service';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { DataCollectionService } from '../services/data-collection.service';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';
import { RecipeTitleDialogComponent } from './recipe-title-dialog.component';

@Component({
  selector: 'app-recipe-detail',
  template: `
    <ng-container *ngIf="dataCollectionDetail as dataCollection">
      <!--breadcrumb-->
      <app-admin-breadcrumb
        [list]="[
          { label: 'Dashboard', link: '/admin/dashboard' },
          { label: 'Recipe List', link: '/admin/page' },
          { label: dataCollection.title, link: null }
        ]"
      />
      <!--content-->
      <div class="py-9">
        <div class="flex flex-row justify-start items-center mb-4">
          <h2 class="text-4xl font-medium">{{ dataCollection.title }}</h2>
          <mat-icon
            class="text-blue-400 material-icons-outlined ml-2 cursor-pointer"
            fontIcon="edit_square"
            (click)="openTitleDialog()"
          ></mat-icon>
        </div>
        <div class="inline-flex items-center">
          <mat-icon fontIcon="link" class="text-blue-400"></mat-icon>
          <a
            [href]="dataCollection.url"
            target="_blank"
            rel="noreferrer noopener"
            class="ml-3 underline"
          >
            Odkaz na recept
          </a>
        </div>

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
              @for (ingredient of optionalIngredients; track ingredient; let ingredientIndex =
              $index) {
              <li class="flex flex-row items-center justify-between">
                <mat-checkbox>{{ ingredient.locale[lang] }}</mat-checkbox>
                <mat-icon
                  aria-hidden="false"
                  aria-label="Delete"
                  fontIcon="delete"
                  class="cursor-pointer text-red-600"
                  (click)="remove(optionalIngredients, ingredientIndex)"
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
            class="rounded bg-green-700 text-white cursor-pointer font-medium py-2 px-3"
            (click)="approveData()"
          >
            Schvalit
          </button>
          <button
            type="button"
            class="rounded bg-red-700 text-white cursor-pointer font-medium py-2 px-3"
            (click)="deleteData()"
          >
            Vymazat data
          </button>
          <button
            type="button"
            class="rounded bg-blue-700 text-white cursor-pointer font-medium py-2 px-3"
            (click)="save()"
          >
            Ulozit
          </button>
        </div>
      </div>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [IngredientService],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
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
    private readonly languageService: LanguageService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit() {
    const routeParam = this.router.snapshot.params;
    const detailId = routeParam['id']; // parseInt(routeParam['id'], 10);
    this.paramId = detailId;

    this.dataCollectionService
      .getDataCollectionPageDetail(detailId)
      .pipe(takeUntil(this.subs))
      .subscribe((value) => {
        this.dataCollectionDetail = value;
        this.requiredIngredients = value.requiredIngredients;
        this.optionalIngredients = value.optionalIngredients;
      });

    this.ingredientService
      .getList()
      .pipe(takeUntil(this.subs))
      .subscribe((value) => {
        this.ingredientList = value;
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

  protected openTitleDialog() {
    let titleLocale = null;
    if (this.dataCollectionDetail) {
      titleLocale = this.dataCollectionDetail.titleLocale;
    }

    this.dialog.open(RecipeTitleDialogComponent, {
      data: { id: this.paramId, locale: titleLocale },
    });
  }
}
