import { Component, Inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { SnackBarService } from '../../../../shared/services/snackbar/snackbar.service';
import { LocaleFileKey } from '../../../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { LocaleService } from '../../../localization-module/services/locale.service';
import { CreateDataCollectionPagePayload } from '../../models/create-data-collection-page-payload.type';
import { DataCollectionService } from '../../services/data-collection.service';
import locale from '../../admin.locale.json';

@Component({
  selector: 'app-create-data-collection-page-dialog',
  templateUrl: './create-data-collection-page-dialog.component.html',
})
export class CreateDataCollectionPageDialogComponent {
  protected readonly locale = locale;
  protected readonly sourceList$ = this.dataCollectionService.getDataCollectionSource();
  protected readonly form = this.fb.group({
    page_url: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    usePredefinedConfiguration: this.fb.control<boolean>(true),
    domainConfigurationId: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    titleSelector: this.fb.control<string>(''),
    imageSelector: this.fb.control<string>(''),
    caloriesSelector: this.fb.control<string>(''),
    cookingTimeSelector: this.fb.control<string>(''),
    ingredientItemSelector: this.fb.control<string>(''),
  });

  constructor(
    @Inject(GeneralLocale) protected generalLocale: LocaleFileKey,
    protected readonly langService: LanguageService,
    private readonly dialogRef: MatDialogRef<CreateDataCollectionPageDialogComponent>,
    private readonly fb: NonNullableFormBuilder,
    private readonly dataCollectionService: DataCollectionService,
    private readonly snackbar: SnackBarService,
    private readonly localeService: LocaleService
  ) {
    this.form.controls.usePredefinedConfiguration.valueChanges.subscribe((usePredefined) => {
      this.updateConfigurationMode(usePredefined);
    });
  }

  protected toggleConfigurationMode() {
    const control = this.form.controls.usePredefinedConfiguration;
    control.setValue(!control.value);
  }

  protected onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();
    const payload: CreateDataCollectionPagePayload = {
      page_url: rawValue.page_url.trim(),
    };

    if (rawValue.usePredefinedConfiguration) {
      payload.domainConfigurationId = rawValue.domainConfigurationId;
    } else {
      const ingredientItemSelector = this.parseIngredientItemSelector(
        rawValue.ingredientItemSelector
      );

      if (!ingredientItemSelector.length) {
        this.form.controls.ingredientItemSelector.setErrors({ required: true });
        this.form.controls.ingredientItemSelector.markAsTouched();
        return;
      }

      payload.titleSelector = rawValue.titleSelector.trim();
      payload.imageSelector = rawValue.imageSelector.trim();
      payload.ingredientItemSelector = ingredientItemSelector;

      if (rawValue.caloriesSelector.trim().length) {
        payload.caloriesSelector = rawValue.caloriesSelector.trim();
      }

      if (rawValue.cookingTimeSelector.trim().length) {
        payload.cookingTimeSelector = rawValue.cookingTimeSelector.trim();
      }
    }

    this.dataCollectionService.createDataCollectionPage(payload).subscribe({
      next: () => {
        this.form.reset();
        this.dialogRef.close();
        this.snackbar.showSimpleMessage(
          this.localeService.getLocaleValue(locale, 'RecipeCreatedMessage')
        );
      },
      error: () => {
        this.snackbar.showSimpleMessage(
          this.localeService.getLocaleValue(locale, 'RecipeCreateFailedMessage')
        );
      },
    });
  }

  private updateConfigurationMode(usePredefined: boolean) {
    const domainConfigurationId = this.form.controls.domainConfigurationId;
    const titleSelector = this.form.controls.titleSelector;
    const imageSelector = this.form.controls.imageSelector;
    const ingredientItemSelector = this.form.controls.ingredientItemSelector;
    const manualControls = [
      titleSelector,
      imageSelector,
      this.form.controls.caloriesSelector,
      this.form.controls.cookingTimeSelector,
      ingredientItemSelector,
    ];

    if (usePredefined) {
      domainConfigurationId.setValidators([Validators.required, Validators.minLength(1)]);
      manualControls.forEach((control) => {
        control.clearValidators();
        control.setValue('');
        control.updateValueAndValidity({ emitEvent: false });
      });
    } else {
      domainConfigurationId.clearValidators();
      domainConfigurationId.setValue('');
      titleSelector.setValidators([Validators.required, Validators.minLength(1)]);
      imageSelector.setValidators([Validators.required, Validators.minLength(1)]);
      ingredientItemSelector.setValidators([Validators.required, Validators.minLength(1)]);
    }

    domainConfigurationId.updateValueAndValidity({ emitEvent: false });
    titleSelector.updateValueAndValidity({ emitEvent: false });
    imageSelector.updateValueAndValidity({ emitEvent: false });
    ingredientItemSelector.updateValueAndValidity({ emitEvent: false });
  }

  private parseIngredientItemSelector(value: string) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length);
  }
}
