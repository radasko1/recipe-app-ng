import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import sharedLocale from '../../../shared/general.locale.json';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { LocaleService } from '../../../shared/services/locale-service/locale.service';
import { SnackBarService } from '../../../shared/services/snackbar/snackbar.service';
import { parseNull } from '../../functions/parse-null.function';
import { DataCollectionDetail } from '../../models/data-collection-detail.interface';
import { DataFieldCustomAction } from '../../models/data-field-custom-action.type';
import { RecipeIngredientDialogData } from '../../models/recipe-ingredient-dialog-data.type';
import { DataCollectionService } from '../../services/data-collection.service';
import { RequiredIngredientCheckboxListService } from '../../services/required-ingredient-checkbox-list.service';
import { RecipeIngredientDialogComponent } from '../recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import locale from './recipe-detail.locale.json';

/** Dynamic type for FormGroup */
type PageDataFormGroup = {
  // [P in keyof DataCollectionDetail]: FormControl<DataCollectionDetail[P]>;
  [key: string]: FormControl<string | null>;
};

type FormControlFieldConfiguration = {
  formControlName: string;
  formControlCustomAction?: DataFieldCustomAction[];
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
        <!--link to the page-->
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
            *ngFor="let control of formControlConfiguration"
            [title]="
              localeService.getLocaleValue(locale, 'FormControlName_' + control.formControlName)
            "
            [formControlName]="control.formControlName"
            [customActionList]="control.formControlCustomAction"
          />
        </form>
        <!---->
        <div class="mt-6 text-right">
          <button
            type="button"
            class="rounded bg-green-700 text-white cursor-pointer font-medium py-2 px-3 mr-2"
            (click)="approveData()"
          >
            {{ sharedLocale[languageService.language].Approve }}
          </button>
          <button
            type="button"
            class="rounded bg-red-700 text-white cursor-pointer font-medium py-2 px-3 mr-2"
            (click)="deleteData()"
          >
            {{ locale[languageService.language].DeleteDataButtonLabel }}
          </button>
          <button
            type="button"
            class="rounded bg-blue-700 text-white cursor-pointer font-medium py-2 px-3"
            (click)="save()"
          >
            {{ sharedLocale[languageService.language].Save }}
          </button>
        </div>
      </div>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RequiredIngredientCheckboxListService],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subs = new Subject<boolean>();
  private paramId: number | undefined;
  /** Empty Form Group. Form Controls will be added when fetch complete */
  protected dataCollectionFormGroup = this.fb.group<PageDataFormGroup>({});
  /** List of Form Control field with configuration */
  protected formControlConfiguration: FormControlFieldConfiguration[] = [];
  protected dataCollectionDetail: DataCollectionDetail | undefined;
  protected readonly locale = locale;
  protected readonly sharedLocale = sharedLocale;

  constructor(
    protected readonly languageService: LanguageService,
    protected readonly reqIngCheckListService: RequiredIngredientCheckboxListService, // better use separated instance for each list
    protected readonly localeService: LocaleService,
    private readonly fb: FormBuilder,
    private readonly router: ActivatedRoute,
    private readonly dataCollectionService: DataCollectionService,
    private readonly snackbar: SnackBarService,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef
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
        this.setupFormControlConfiguration<DataCollectionDetail>(value);
        this.cdr.markForCheck();
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

  /**
   * Set list of all Form Controls based on fetched response object
   * @param responseObject
   * @protected
   */
  protected setupFormControlConfiguration<T>(responseObject: any) {
    const formControlKeys = Object.keys(responseObject);
    formControlKeys.forEach((k) => {
      const _k = k as keyof T;
      const value = parseNull(responseObject[_k]);
      this.addFormControl(k, value);
      // setup custom actions
      this.formControlConfiguration.push({
        formControlName: k,
        formControlCustomAction: this.setupCustomAction(k),
      });
    });
  }

  /**
   * Setup custom action for specified Form Controls
   * @param formControlName
   * @protected
   */
  protected setupCustomAction(formControlName: string): DataFieldCustomAction[] | undefined {
    if (!this.dataCollectionDetail) {
      return undefined;
    }
    const { requiredIngredients, optionalIngredients } = this.dataCollectionDetail;
    const language = this.languageService.language;

    if (formControlName === 'titleLocale') {
      return [
        {
          label: sharedLocale[this.languageService.language].Reset,
          onClick: () => {
            this.setLocaleDefaultValue();
          },
        },
      ];
    } else if (formControlName === 'requiredIngredients') {
      return [
        {
          label: locale[this.languageService.language].IngredientsButtonLabel,
          onClick: () => {
            this.openDialogForIngredients(
              locale[language].RequiredIngredients,
              'requiredIngredients',
              requiredIngredients
            );
          },
        },
      ];
    } else if (formControlName === 'optionalIngredients') {
      return [
        {
          label: locale[this.languageService.language].IngredientsButtonLabel,
          onClick: () => {
            this.openDialogForIngredients(
              locale[language].OptionalIngredients,
              'optionalIngredients',
              optionalIngredients
            );
          },
        },
      ];
    }
    return undefined;
  }

  /**
   * Add new Form Control with specified name into Form Group
   * @param formControlName
   * @param value
   * @protected
   */
  protected addFormControl(formControlName: string, value: string | null = null): void {
    this.dataCollectionFormGroup.addControl(formControlName, this.fb.control<string | null>(value));
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
            this.dataCollectionFormGroup.controls[formControlName].setValue(value);
            this.cdr.markForCheck(); // TODO updated value is not visible
          },
        },
      }
    );
  }

  /** Set default value to 'titleLocale' form control */
  protected setLocaleDefaultValue() {
    const value = JSON.stringify({ cs: '', en: '' });
    this.dataCollectionFormGroup.controls['titleLocale'].setValue(value);
  }

  /** Save Recipe Ingredients for specific Data Collection */
  protected save() {
    if (!this.paramId) {
      return;
    }

    const parsedDataCollection = this.formatFormControl();
    this.dataCollectionService.updatePageData(this.paramId, parsedDataCollection).subscribe({
      next: () => {
        this.snackbar.showSimpleMessage(sharedLocale[this.languageService.language].SaveSuccessful);
      },
      error: () => {
        this.snackbar.showSimpleMessage(sharedLocale[this.languageService.language].SaveFailed);
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
