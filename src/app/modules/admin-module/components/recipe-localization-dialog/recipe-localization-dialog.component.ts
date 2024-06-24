import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { Locale } from '../../../search-module/models/locale.interface';
import { RecipeLocaleTitleDialogData } from '../../models/recipe-locale-title-dialog-data.type';

type LocalizationFormGroup = {
  readonly [P in keyof Locale]: FormControl<Locale[P]>;
};

@Component({
  selector: 'app-recipe-localization-dialog',
  templateUrl: './recipe-localization-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeLocalizationDialogComponent implements OnInit {
  protected readonly data: RecipeLocaleTitleDialogData = inject(MAT_DIALOG_DATA);
  protected readonly generalLocale = inject(GeneralLocale);
  protected readonly lang = inject(LanguageService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dialogRef: MatDialogRef<RecipeLocalizationDialogComponent> =
    inject(MatDialogRef);
  private readonly fb = inject(FormBuilder);
  /** Form Group for each localization language */
  // @ts-ignore
  protected readonly formGroup = this.fb.group<LocalizationFormGroup>({});

  ngOnInit() {
    this.assignLocalization();
    this.cdr.detectChanges();
  }

  /**
   * Set value from localization object for each form control in form group
   * @private
   */
  private assignLocalization() {
    if (!this.data.localization) {
      return;
    }

    const localization = this.data.localization;
    for (const locale in localization) {
      // @ts-ignore
      const value = localization[locale] as Locale;
      // @ts-ignore
      this.formGroup.addControl(locale, this.fb.control(value));
    }
  }

  /**
   * Return list of all keys of form controls inside form group
   * @protected
   */
  protected get formControlNames() {
    return Object.keys(this.formGroup.controls);
  }

  /**
   * Save button handler
   * @protected
   */
  protected onSave() {
    const formGroupValue = this.formGroup.getRawValue();
    this.data.onSave(formGroupValue);
    this.dialogRef.close();
  }
}
