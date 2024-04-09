import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { Ingredient } from '../../search-module/models/ingredient.interface';
import { IngredientService } from '../../shared/services/ingredient-service/ingredient.service';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { DataCollectionService } from '../services/data-collection.service';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';
import { RequiredIngredientCheckboxListService } from '../services/required-ingredient-checkbox-list.service';
import { RecipeDetailCheckboxListComponent } from './recipe-detail-checkbox-list.component';
import { LanguageObject } from '../../language-switch-module/models/language-object.type';
import sharedLocale from '../../shared/general.locale.json';

/** Localized text collection */
const LOCALE_TEXT: LanguageObject = {
  cs: {
    RecipeLink: 'Přejít na stránku s receptem',
    RequiredIngredients: 'Požadované Suroviny',
    OptionalIngredients: 'Volitelné Suroviny',
    Recipe: 'Ingredience z receptu',
    IngredientName: 'Název suroviny',
    RecipeList: 'Seznam receptů',
    FormControlName_url: 'URL',
    FormControlName_title: 'Název',
    FormControlName_titleLocale: 'Lokalizovaný Název',
    FormControlName_calories: 'Počet kalorií',
    FormControlName_cookingTime: 'Doba přípravy',
    FormControlName_ingredients: 'Ingredience (ze stránky)',
    FormControlName_requiredIngredients: 'Požadované ingredience do receptu',
    FormControlName_optionalIngredients: 'Volitelné ingredience do receptu',
  },
  en: {
    RecipeLink: 'Go to the recipe page',
    RequiredIngredients: 'Required Ingredients',
    OptionalIngredients: 'Optional Ingredients',
    Recipe: 'Ingredients from Recipe',
    IngredientName: 'Ingredient name',
    RecipeList: 'Recipe list',
    FormControlName_url: 'URL',
    FormControlName_title: 'Title',
    FormControlName_titleLocale: 'Localized Title',
    FormControlName_calories: 'Calories',
    FormControlName_cookingTime: 'Preparation time',
    FormControlName_ingredients: 'Ingredients (from page)',
    FormControlName_requiredIngredients: 'Required ingredients for recipe',
    FormControlName_optionalIngredients: 'Optional ingredients for recipe',
  },
};
// maybe it will need to be extended
type PageDataFormGroup = {
  // [P in keyof DataCollectionDetail]: FormControl<DataCollectionDetail[P]>;
  [key: string]: FormControl<string | null>;
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
        </div>
        <!--link-->
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
        <!--        <div class="flex flex-row -mx-5 mt-10">-->
        <!--          &lt;!&ndash;recipe ingredient&ndash;&gt;-->
        <!--          <app-recipe-detail-checkbox-list-->
        <!--            class="basis-1/3 px-5"-->
        <!--            [title]="LOCALE_TEXT[languageService.language]['Recipe']"-->
        <!--            [list]="dataCollection.ingredients"-->
        <!--          />-->
        <!--          &lt;!&ndash;required ingredients&ndash;&gt;-->
        <!--          <app-recipe-detail-checkbox-list-->
        <!--            #requiredIng-->
        <!--            class="basis-1/3 px-5"-->
        <!--            [title]="LOCALE_TEXT[languageService.language]['RequiredIngredients']"-->
        <!--            [list]="requiredIngredients"-->
        <!--            [dataService]="reqIngCheckListService"-->
        <!--            [showAutocomplete]="true"-->
        <!--            [autocompleteList]="ingredientList"-->
        <!--          />-->
        <!--          &lt;!&ndash;optional ingredients&ndash;&gt;-->
        <!--          <app-recipe-detail-checkbox-list-->
        <!--            #optionalIng-->
        <!--            class="basis-1/3 px-5"-->
        <!--            [title]="LOCALE_TEXT[languageService.language]['OptionalIngredients']"-->
        <!--            [list]="optionalIngredients"-->
        <!--            [dataService]="reqIngCheckListService"-->
        <!--            [showAutocomplete]="true"-->
        <!--            [autocompleteList]="ingredientList"-->
        <!--          />-->
        <!--        </div>-->

        <hr class="my-5" />

        <!--Render all FormControl from FormGroup-->
        <div class="block">
          <app-data-field
            *ngFor="let control of formControlSettings"
            [title]="
              LOCALE_TEXT[languageService.language]['FormControlName_' + control.controlName]
            "
            [formGroupRef]="dataCollectionFormGroup"
            [formControlNameRef]="control.controlName"
            [customActionList]="control.actions"
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
  protected dataCollectionFormGroup: FormGroup<PageDataFormGroup>;
  protected dataCollectionDetail: DataCollectionDetail | undefined;
  protected ingredientList: Ingredient[] = [];
  protected readonly LOCALE_TEXT = LOCALE_TEXT;

  constructor(
    protected readonly languageService: LanguageService,
    protected readonly reqIngCheckListService: RequiredIngredientCheckboxListService, // better use separated instance for each list
    private readonly fb: FormBuilder,
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService,
    private readonly ingredientService: IngredientService,
    private readonly snackBar: MatSnackBar
  ) {
    // empty == null? how to set null values?
    // TODO create dynamically with loop?
    this.dataCollectionFormGroup = this.fb.group<PageDataFormGroup>({
      url: this.fb.control<string | null>(null),
      title: this.fb.control<string | null>(null),
      titleLocale: this.fb.control<string | null>(null),
      calories: this.fb.control<string | null>(null),
      cookingTime: this.fb.control<string | null>(null),
      ingredients: this.fb.control<string | null>(null),
      requiredIngredients: this.fb.control<string | null>(null),
      optionalIngredients: this.fb.control<string | null>(null),
    });
  }

  ngOnInit() {
    const routeParam = this.router.snapshot.params;
    const detailId = routeParam['id'];
    this.paramId = detailId;

    this.dataCollectionService
      .getDataCollectionPageDetail(detailId)
      .pipe(takeUntil(this.subs))
      .subscribe((value) => {
        Object.keys(value).forEach((key) => {
          const k = key as keyof DataCollectionDetail;
          // stringify response object
          this.dataCollectionFormGroup.get(key)?.setValue(JSON.stringify(value[k]));
        });
        this.dataCollectionDetail = value;
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
    const language = this.languageService.language;
    return [
      { label: 'Dashboard', link: '/admin/dashboard' },
      { label: LOCALE_TEXT[language]['RecipeList'], link: '/admin/page' },
      { label: dataCollection.title, link: null },
    ];
  }

  /** Get list of form-controls from FormGroup */
  protected get formControlList() {
    return Object.keys(this.dataCollectionFormGroup.controls);
  }

  /** Provide list of all Form Group control keys with custom action definition */
  protected get formControlSettings() {
    return [
      { controlName: 'url' },
      { controlName: 'title' },
      { controlName: 'titleLocale' },
      { controlName: 'calories' },
      { controlName: 'cookingTime' },
      { controlName: 'ingredients' },
      {
        controlName: 'requiredIngredients',
        actions: [
          {
            label: 'Button Label Test',
            onClick: () => {
              console.log('Clicked');
            },
          },
        ],
      },
      { controlName: 'optionalIngredients' },
    ];
  }

  protected formatFormControl(): string {
    const list = this.formControlList;
    let dataObject = {};

    list.forEach((key) => {
      const _control = this.dataCollectionFormGroup.get(key);
      if (!_control) {
        return;
      }
      dataObject = Object.assign({}, dataObject, { [key]: JSON.parse(_control.value) });
    });

    return JSON.stringify(dataObject);
  }

  /** Save Recipe Ingredients for specific Data Collection */
  protected save() {
    if (!this.paramId) {
      return;
    }

    const parsedDataCollection = this.formatFormControl();
    this.dataCollectionService.updatePageData(this.paramId, parsedDataCollection).subscribe({
      next: () => {
        this.snackBar.open(sharedLocale[this.languageService.language].SaveSuccessful, undefined, {
          duration: 2000,
        });
      },
      error: () => {
        this.snackBar.open(sharedLocale[this.languageService.language].SaveFailed, undefined, {
          duration: 2000,
        });
      },
    });
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
