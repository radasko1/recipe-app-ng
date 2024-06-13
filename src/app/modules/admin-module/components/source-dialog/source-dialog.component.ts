import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { SnackBarService } from '../../../../shared/services/snackbar/snackbar.service';
import { LocaleFileKey } from '../../../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { LocaleService } from '../../../localization-module/services/locale.service';
import locale from '../../admin.locale.json';
import { DataCollectionService } from '../../services/data-collection.service';

type Source = { value: string; disabled: boolean };
type DialogWindowConfig = {
  source: Source;
};

@Component({
  selector: 'app-source-dialog',
  templateUrl: './source-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SourceDialogComponent {
  protected readonly locale = locale;
  protected readonly form = this.fb.group({
    url: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    origin: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    config: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: DialogWindowConfig,
    @Inject(GeneralLocale) protected generalLocale: LocaleFileKey,
    protected readonly langService: LanguageService,
    private readonly dialogRef: MatDialogRef<SourceDialogComponent>,
    private readonly fb: NonNullableFormBuilder,
    private readonly dataCollectionService: DataCollectionService,
    private readonly snackbar: SnackBarService,
    private readonly localeService: LocaleService
  ) {}

  protected onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const formData = this.form.getRawValue();
    this.dataCollectionService.addSource(formData).subscribe({
      next: () => {
        this.form.reset();
        this.dialogRef.close();
        this.snackbar.showSimpleMessage(
          this.localeService.getLocaleValue(locale, 'SourceAddedMessage')
        );
      },
      error: (err) => {
        if (err.status === 409) {
          this.snackbar.showSimpleMessage(
            this.localeService.getLocaleValue(locale, 'ExistMessage')
          );
        }
      },
    });
  }
}
