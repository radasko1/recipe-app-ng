import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { Localized } from '../../../../shared/models/localized.type';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { SnackBarService } from '../../../../shared/services/snackbar/snackbar.service';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { LocaleService } from '../../../localization-module/services/locale.service';
import { Locale } from '../../../search-module/models/locale.interface';
import { DataCollectionDetail } from '../../models/data-collection-detail.interface';
import { DataFieldCustomAction } from '../../models/data-field-custom-action.type';
import { RecipeIngredientDialogData } from '../../models/recipe-ingredient-dialog-data.type';
import { DataCollectionService } from '../../services/data-collection.service';
import { RequiredIngredientCheckboxListService } from '../../services/required-ingredient-checkbox-list.service';
import { RecipeIngredientDialogComponent } from '../recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import locale from './recipe-detail.locale.json';

/**
 * Dynamic type for FormGroup
 * @description Transformed from {@link DataCollectionDetail}
 * @see DataCollectionDetail
 */
type RecipeFormGroup = {
  // TODO should be change to form field which can show string without quotation marks, numbers, array or objects
  // [field in keyof DataCollectionDetail]: FormControl<DataCollectionDetail[field]>;
  title: FormControl<string>;
  url: FormControl<string>;
  image: FormControl<string | null>;
  calories: FormControl<number>; // kcal
  cookingTime: FormControl<number | null>; // minutes
  titleLocale: FormControl<Localized>;
  // ingredients: FormArray<FormControl<string | unknown>>; // unknown for empty array
  ingredients: FormControl<string>;
  // requiredIngredients: FormArray<FormControl<number | unknown>>; // unknown for empty array
  requiredIngredients: FormControl<string>;
  // optionalIngredients: FormArray<FormControl<number | unknown>>; // unknown for empty array
  optionalIngredients: FormControl<string>;
};

type FormControlFieldConfiguration = {
  propertyName: string;
  title: string;
  customAction?: DataFieldCustomAction[];
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
  private readonly fb = inject(FormBuilder);

  /** Recipe title from fetched data */
  protected recipeTitle: string = '';
  /** Translated Recipe title from fetched data */
  protected recipeLocalizedTitle: Locale | null = null;
  /** Recipe URL link from fetched data */
  protected recipeURL: string | undefined;
  /** Form Controls will be added when fetch complete */
  protected formGroup = this.fb.group<RecipeFormGroup>({
    title: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    url: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    image: this.fb.control('', { validators: [Validators.required] }),
    cookingTime: this.fb.control(0, Validators.required),
    calories: this.fb.control(0, { nonNullable: true, validators: [Validators.required] }),
    titleLocale: this.fb.control<Locale>(
      { en: '', cs: '' },
      { validators: [Validators.required], nonNullable: true }
    ),
    ingredients: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    optionalIngredients: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    requiredIngredients: this.fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  /** List of Form Control field with configuration */
  protected formControlConfiguration: FormControlFieldConfiguration[] = [];
  protected readonly locale = locale;
  protected readonly generalLocale = inject(GeneralLocale);
  protected readonly languageService = inject(LanguageService);
  protected readonly reqIngCheckListService = inject(RequiredIngredientCheckboxListService); // better use separated instance for each list
  protected readonly localeService = inject(LocaleService);
  private readonly dataCollectionService = inject(DataCollectionService);
  private readonly snackbar = inject(SnackBarService);

  constructor(
    private readonly router: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const routeParam = this.router.snapshot.params;
    const detailId = routeParam['id'];
    this.paramId = detailId;
    // TODO create function to parse query params into specified interface

    // Listen for language change
    this.languageService.onLanguageChange$.pipe(takeUntil(this.subs)).subscribe({
      next: () => {
        this.cdr.markForCheck();
      },
    });

    this.dataCollectionService
      .getDataCollectionPageDetail(detailId)
      .pipe(
        takeUntil(this.subs),
        map((recipe) => {
          this.recipeURL = recipe.url;
          this.recipeTitle = recipe.title;
          this.recipeLocalizedTitle = recipe.titleLocale;
          return recipe;
        })
      )
      .subscribe((response) => {
        // TODO what if data is empty
        this.assignFormControlData(response);
        this.setFormGroupValues<DataCollectionDetail>(response);
        this.cdr.detectChanges();
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
  protected assignFormControlData(responseObject: any) {
    const formControlKeys = Object.keys(responseObject);
    formControlKeys.forEach((k) => {
      // setup custom actions
      this.formControlConfiguration.push({
        propertyName: k,
        title: this.localeService.getLocaleValue(locale, 'FormControlName_' + k),
        customAction: this.setupCustomAction(k),
      });
    });
  }

  /**
   * Set values of form controls in form group from fetched data
   * @param fetchedDataObject
   * @private
   */
  private setFormGroupValues<T>(fetchedDataObject: T) {
    for (const prop in fetchedDataObject) {
      const fetchedDataValue: any = fetchedDataObject[prop];
      const formControlWithPropertyName = this.formGroup.get(prop);

      // property does not exist
      if (!formControlWithPropertyName) {
        continue;
      }
      // whether it's array
      if (Array.isArray(fetchedDataValue)) {
        const arrayString: any = fetchedDataValue.toString(); // array transformed into string
        formControlWithPropertyName.setValue(arrayString);
        continue;
      }
      // is form-control
      formControlWithPropertyName.setValue(fetchedDataValue);
    }
  }

  /**
   * Setup custom action for specified Form Controls
   * @param formControlName
   * @protected
   */
  protected setupCustomAction(formControlName: string): DataFieldCustomAction[] | undefined {
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
              this.formGroup.controls.requiredIngredients
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
              this.formGroup.controls.optionalIngredients
            );
          },
        },
      ];
    }
    return undefined;
  }

  /**
   * Transform FormControl from FormGroup values into DataCollectionDetail
   */
  protected formatFormControl(): DataCollectionDetail {
    // TODO would be nice to have it dynamic
    const output: DataCollectionDetail = {
      url: this.formGroup.controls.url.value,
      title: this.formGroup.controls.title.value,
      calories: this.formGroup.controls.calories.value,
      cookingTime: this.formGroup.controls.cookingTime.value,
      image: this.formGroup.controls.image.value,
      titleLocale: this.formGroup.controls.titleLocale.value,
      ingredients: this.formGroup.controls.ingredients.value.split(','),
      optionalIngredients: this.transformToArray(this.formGroup.controls.optionalIngredients.value),
      requiredIngredients: this.transformToArray(this.formGroup.controls.requiredIngredients.value),
    };
    return output;
  }

  /**
   * Transform String array back into Array format
   * @param value
   * @private
   */
  private transformToArray(value: string): any[] {
    if (!value.length) {
      return [];
    }
    return value.split(',').map((v) => parseInt(v, 10));
  }

  /**
   * Open dialog with RecipeIngredientDialogComponent.
   * @param dialogTitle
   * @param itemList Array turned into String
   */
  protected openDialogForIngredients(dialogTitle: string, itemList: FormControl<string>) {
    const parsedArray = itemList.value.split(',').map((item) => parseInt(item, 10));

    this.dialog.open<RecipeIngredientDialogComponent, RecipeIngredientDialogData>(
      RecipeIngredientDialogComponent,
      {
        data: {
          dialogTitle: dialogTitle,
          list: parsedArray,
          serviceInstance: this.reqIngCheckListService,
          onSave: (value: string) => {
            itemList.setValue(value); // re-assign values
          },
        },
      }
    );
  }

  /** Set default value to 'titleLocale' form control */
  protected setLocaleDefaultValue() {
    const value: Locale = { cs: '', en: '' };
    this.formGroup.controls.titleLocale.setValue(value);
  }

  /** Save Recipe Ingredients for specific Data Collection */
  protected save() {
    if (!this.paramId) {
      return;
    }

    const dataCollection = this.formatFormControl();
    this.dataCollectionService
      .updatePageData(this.paramId, JSON.stringify(dataCollection))
      .subscribe({
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
    // TODO show some message after approve recipe
    this.dataCollectionService.approvePageData(this.paramId).subscribe();
  }
}
