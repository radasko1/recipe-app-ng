import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Ingredient } from '../../search-module/models/ingredient.interface';
import { IngredientService } from '../../shared/services/ingredient-service/ingredient.service';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { DataCollectionService } from '../services/data-collection.service';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';
import { RequiredIngredientCheckboxListService } from '../services/required-ingredient-checkbox-list.service';
import { RecipeDetailCheckboxListComponent } from './recipe-detail-checkbox-list.component';
import { RecipeTitleDialogComponent } from './recipe-title-dialog.component';
import { LanguageObject } from '../../language-switch-module/models/language-object.type';

/** Localized text collection */
const LOCALE_TEXT: LanguageObject = {
  cs: {
    RecipeLink: 'Přejít na stránku s receptem',
    RequiredIngredients: 'Požadované Suroviny',
    OptionalIngredients: 'Volitelné Suroviny',
    Recipe: 'Ingredience z receptu',
    IngredientName: 'Název suroviny',
  },
  en: {
    RecipeLink: 'Go to the recipe page',
    RequiredIngredients: 'Required Ingredients',
    OptionalIngredients: 'Optional Ingredients',
    Recipe: 'Ingredients from Recipe',
    IngredientName: 'Ingredient name',
  },
};

@Component({
  selector: 'app-recipe-detail',
  template: `
    <ng-container *ngIf="dataCollectionDetail as dataCollection">
      <!--breadcrumb-->
      <app-admin-breadcrumb [list]="breadcrumbPageList(dataCollection)" />
      <!--content-->
      <div class="py-9">
        <div class="flex flex-row justify-start items-center mb-4">
          <h2 class="text-4xl font-medium">
            {{
              dataCollection.titleLocale
                | localizedTitle: languageService.language : dataCollection.title
            }}
          </h2>
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
            {{ LOCALE_TEXT[languageService.language]['RecipeLink'] }}
          </a>
        </div>
        <!---->
        <div class="flex flex-row -mx-5 mt-10">
          <!--recipe ingredient-->
          <app-recipe-detail-checkbox-list
            class="basis-1/3 px-5"
            [title]="LOCALE_TEXT[languageService.language]['Recipe']"
            [list]="dataCollection.ingredients"
          />
          <!--required ingredients-->
          <app-recipe-detail-checkbox-list
            #requiredIng
            class="basis-1/3 px-5"
            [title]="LOCALE_TEXT[languageService.language]['RequiredIngredients']"
            [list]="requiredIngredients"
            [dataService]="reqIngCheckListService"
            [showAutocomplete]="true"
            [autocompleteList]="ingredientList"
          />
          <!--optional ingredients-->
          <app-recipe-detail-checkbox-list
            #optionalIng
            class="basis-1/3 px-5"
            [title]="LOCALE_TEXT[languageService.language]['OptionalIngredients']"
            [list]="optionalIngredients"
            [dataService]="reqIngCheckListService"
            [showAutocomplete]="true"
            [autocompleteList]="ingredientList"
          />
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
  providers: [RequiredIngredientCheckboxListService],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  @ViewChild('requiredIng') requiredListComponent:
    | RecipeDetailCheckboxListComponent<Ingredient, Ingredient>
    | undefined;

  private subs = new Subject<boolean>();
  private paramId: number | undefined;
  protected dataCollectionDetail: DataCollectionDetail | undefined;
  protected requiredIngredients: Ingredient[] = [];
  protected optionalIngredients: Ingredient[] = [];
  protected ingredientList: Ingredient[] = [];
  protected readonly LOCALE_TEXT = LOCALE_TEXT;

  constructor(
    protected readonly languageService: LanguageService,
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService,
    private readonly ingredientService: IngredientService,
    private readonly dialog: MatDialog,
    // better use separated instance for each list
    protected readonly reqIngCheckListService: RequiredIngredientCheckboxListService
  ) {}

  ngOnInit() {
    const routeParam = this.router.snapshot.params;
    const detailId = routeParam['id'];
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

  protected breadcrumbPageList(dataCollection: DataCollectionDetail) {
    return [
      { label: 'Dashboard', link: '/admin/dashboard' },
      { label: 'Recipe List', link: '/admin/page' },
      { label: dataCollection.title, link: null },
    ];
  }

  /** Save Recipe Ingredients for specific Data Collection */
  protected save() {
    if (!this.paramId) {
      return;
    }

    // list is mutated (reference)
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
    let title = null,
      titleLocale = null;
    if (this.dataCollectionDetail) {
      title = this.dataCollectionDetail.title;
      titleLocale = this.dataCollectionDetail.titleLocale;
    }

    this.dialog.open(RecipeTitleDialogComponent, {
      data: { id: this.paramId, title: title, locale: titleLocale },
    });
  }
}
