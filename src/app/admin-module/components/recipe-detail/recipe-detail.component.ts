import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { LanguageService } from '../../../shared/services/language-service/language.service';
import { LocaleService } from '../../../shared/services/locale-service/locale.service';
import { DataFieldCustomAction } from '../../models/data-field-custom-action.type';
import { RecipeIngredientDialogData } from '../../models/recipe-ingredient-dialog-data.type';
import { DataCollectionService } from '../../services/data-collection.service';
import { DataCollectionDetail } from '../../models/data-collection-detail.interface';
import { RequiredIngredientCheckboxListService } from '../../services/required-ingredient-checkbox-list.service';
import sharedLocale from '../../../shared/general.locale.json';
import { RecipeIngredientDialogComponent } from '../recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import locale from './recipe-detail.locale.json';

/** Transformed type for FormGroup */
type PageDataFormGroup = {
  // [P in keyof DataCollectionDetail]: FormControl<DataCollectionDetail[P]>;
  [key: string]: FormControl<string | null>;
};

type RecipeDetailDataField = {
  formControlName: string;
  actions?: DataFieldCustomAction[];
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
            {{ locale[languageService.language].RecipeLink }}
          </a>
        </div>
        <!---->
        <hr class="my-5" />
        <!--Render all FormControl from FormGroup-->
        <form class="block" [formGroup]="dataCollectionFormGroup">
          <app-text-data-field
            *ngFor="let control of formControlSettings"
            [title]="
              localeService.getLocaleValue(locale, 'FormControlName_' + control.formControlName)
            "
            [formControlName]="control.formControlName"
            [customActionList]="control.actions"
          />
        </form>
        <!---->
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
  private subs = new Subject<boolean>();
  private paramId: number | undefined;
  protected dataCollectionFormGroup: FormGroup<PageDataFormGroup>;
  protected dataCollectionDetail: DataCollectionDetail | undefined;
  protected readonly locale = locale;

  constructor(
    protected readonly languageService: LanguageService,
    protected readonly reqIngCheckListService: RequiredIngredientCheckboxListService, // better use separated instance for each list
    protected readonly localeService: LocaleService,
    private readonly fb: FormBuilder,
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {
    // empty == null? how to set null values?
    // TODO create dynamically with loop?
    this.dataCollectionFormGroup = this.fb.group<PageDataFormGroup>({
      url: this.fb.control(null),
      title: this.fb.control(null),
      titleLocale: this.fb.control(null),
      calories: this.fb.control(null),
      cookingTime: this.fb.control(null),
      ingredients: this.fb.control(null),
      requiredIngredients: this.fb.control(null),
      optionalIngredients: this.fb.control(null),
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
  }

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }

  protected breadcrumbPageList(dataCollection: DataCollectionDetail) {
    const language = this.languageService.language;
    return [
      { label: 'Dashboard', link: '/admin/dashboard' },
      { label: locale[language].RecipeList, link: '/admin/page' },
      { label: dataCollection.title, link: null },
    ];
  }

  /** Provide list of all Form Group control keys with custom action definition */
  protected get formControlSettings(): RecipeDetailDataField[] {
    if (!this.dataCollectionDetail) {
      return [];
    }

    const { requiredIngredients, optionalIngredients } = this.dataCollectionDetail;
    const requiredIngredientsTitle = this.locale[this.languageService.language].RequiredIngredients;
    const optionalIngredientsTitle = this.locale[this.languageService.language].RequiredIngredients;

    return [
      { formControlName: 'url' },
      { formControlName: 'title' },
      { formControlName: 'titleLocale' },
      { formControlName: 'calories' },
      { formControlName: 'cookingTime' },
      { formControlName: 'ingredients' },
      {
        formControlName: 'requiredIngredients',
        actions: [
          {
            label: locale[this.languageService.language].IngredientsButtonLabel,
            onClick: () => {
              this.openDialogForIngredients(
                requiredIngredientsTitle,
                'requiredIngredients',
                requiredIngredients
              );
            },
          },
        ],
      },
      {
        formControlName: 'optionalIngredients',
        actions: [
          {
            label: locale[this.languageService.language].IngredientsButtonLabel,
            onClick: () => {
              this.openDialogForIngredients(
                optionalIngredientsTitle,
                'optionalIngredients',
                optionalIngredients
              );
            },
          },
        ],
      },
    ];
  }

  /**
   * Transform FormControl values into string
   */
  protected formatFormControl(): string {
    const formControlCollection = Object.keys(this.dataCollectionFormGroup.controls);
    const dataObject = formControlCollection.reduce((result, formControlName) => {
      const control = this.dataCollectionFormGroup.get(formControlName);
      return control ? { ...result, [formControlName]: JSON.parse(control.value) } : result;
    }, {});
    return JSON.stringify(dataObject);
  }

  /**
   * Open dialog with RecipeIngredientDialogComponent.
   * @param dialogTitle
   * @param formControlName
   * @param itemList
   */
  protected openDialogForIngredients(
    dialogTitle: string,
    formControlName: string,
    itemList: any[]
  ) {
    if (!this.dataCollectionDetail) {
      return;
    }

    this.dialog.open<RecipeIngredientDialogComponent, RecipeIngredientDialogData>(
      RecipeIngredientDialogComponent,
      {
        data: {
          dialogTitle: dialogTitle,
          list: itemList,
          serviceInstance: this.reqIngCheckListService,
          onSave: (value: string) => {
            const control = this.dataCollectionFormGroup.get(formControlName);
            if (!control) {
              return;
            }
            control.setValue(value);
          },
        },
      }
    );
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
