import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { SnackBarService } from '../../../../shared/services/snackbar/snackbar.service';
import { LocaleFileKey } from '../../../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { LocaleService } from '../../../localization-module/services/locale.service';
import { parseNull } from '../../functions/parse-null.function';
import { CreateFormControlData } from '../../models/create-form-control-data.type';
import { DataCollectionDetail } from '../../models/data-collection-detail.interface';
import { DataFieldCustomAction } from '../../models/data-field-custom-action.type';
import { RecipeIngredientDialogData } from '../../models/recipe-ingredient-dialog-data.type';
import { DataCollectionService } from '../../services/data-collection.service';
import { RequiredIngredientCheckboxListService } from '../../services/required-ingredient-checkbox-list.service';
import { CreateFormControlComponent } from '../create-form-control/create-form-control.component';
import { RecipeIngredientDialogComponent } from '../recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import locale from './recipe-detail.locale.json';

/** Dynamic type for FormGroup */
type PageDataFormGroup = {
  // [P in keyof DataCollectionDetail]: FormControl<DataCollectionDetail[P]>;
  [key: string]: FormControl<string | null>;
};

type FormControlFieldConfiguration = {
  formControlName: string;
  formControlLabel: string;
  formControlCustomAction?: DataFieldCustomAction[];
};

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
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

  constructor(
    @Inject(GeneralLocale) protected generalLocale: LocaleFileKey,
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
    // TODO create function to parse query params into specified interface

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

  /**
   * Get list of pages in breadcrumb ordered chronologically
   * @param currentPageTitle
   * @protected
   */
  protected getBreadcrumbPageList(currentPageTitle: string) {
    const language = this.languageService.language;
    return [
      { label: 'Dashboard', link: '/admin/dashboard' },
      { label: locale[language].RecipeList, link: '/admin/page' },
      { label: currentPageTitle, link: null },
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
      // TODO merge together?
      this.addFormControl(k, value);
      // setup custom actions
      this.formControlConfiguration.push({
        formControlName: k,
        formControlLabel: this.localeService.getLocaleValue(locale, 'FormControlName_' + k),
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
          label: this.localeService.getLocaleValue(this.generalLocale, 'Reset'),
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

  /** Open dialog to create new Form Control */
  protected openCreateFormControlDialog() {
    this.dialog.open<CreateFormControlComponent, CreateFormControlData>(
      CreateFormControlComponent,
      {
        data: {
          onSave: (formControlName: string) => {
            this.formControlConfiguration.push({
              formControlName: formControlName,
              formControlLabel: formControlName,
            });
            this.addFormControl(formControlName);
            this.cdr.markForCheck();
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
        this.snackbar.showSimpleMessage(
          this.localeService.getLocaleValue(this.generalLocale, 'SaveSuccessful')
        );
      },
      error: () => {
        this.snackbar.showSimpleMessage(
          this.localeService.getLocaleValue(this.generalLocale, 'SaveFailed')
        );
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
