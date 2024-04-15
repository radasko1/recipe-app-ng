import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocaleFileKey } from "../../../localization-module/models/locale-file-key.type";
import { GeneralLocale } from "../../../localization-module/services/general-locale.token";
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { LocaleService } from '../../../localization-module/services/locale.service';
import { SnackBarService } from '../../../shared/services/snackbar/snackbar.service';
import locale from '../../admin.locale.json';
import { DataCollectionSource } from '../../models/data-collection-source.interface';
import { DataCollectionService } from '../../services/data-collection.service';

type SourcePageDialog = {
  source: DataCollectionSource;
};

@Component({
  selector: 'app-source-page-dialog',
  templateUrl: './source-page-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SourcePageDialogComponent {
  protected readonly locale = locale;
  protected readonly form = this.fb.group({
    source: this.fb.control<string>(
      { value: this.data.source.origin, disabled: true },
      { validators: [Validators.required, Validators.minLength(1)] }
    ),
    url: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: SourcePageDialog,
    @Inject(GeneralLocale) protected generalLocale: LocaleFileKey,
    protected readonly langService: LanguageService,
    private readonly dialogRef: MatDialogRef<SourcePageDialogComponent>,
    private readonly fb: NonNullableFormBuilder,
    private readonly dataCollectionService: DataCollectionService,
    private readonly snackbar: SnackBarService,
    private readonly localeService: LocaleService
  ) {}

  protected onSubmit() {
    if (this.form.status === 'INVALID') {
      return;
    }

    const id = this.data.source.id;
    const url = this.form.controls.url.value;

    this.dataCollectionService.addSourceLink(id, url).subscribe({
      next: () => {
        this.form.reset();
        this.dialogRef.close();
        this.snackbar.showSimpleMessage(
          this.localeService.getLocaleValue(locale, 'SourcePageAddedMessage')
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
