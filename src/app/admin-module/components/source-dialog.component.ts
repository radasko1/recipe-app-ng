import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { LanguageService } from '../../shared/services/language-service/language.service';
import { LocaleService } from '../../shared/services/locale-service/locale.service';
import { SnackBarService } from '../../shared/services/snackbar/snackbar.service';
import locale from '../admin.locale.json';
import sharedLocale from '../../shared/general.locale.json';
import { DataCollectionService } from '../services/data-collection.service';

type Source = { value: string; disabled: boolean };
type DialogWindowConfig = {
  source: Source;
};

@Component({
  selector: 'app-source-dialog',
  template: `
    <h2 mat-dialog-title class="text-black">{{ locale[langService.language].NewSource }}</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <!--url-->
        <div class="block mb-5">
          <label for="url" class="block font-medium mb-1 text-black">
            {{ locale[langService.language].Link }}
          </label>
          <input
            id="url"
            type="text"
            formControlName="url"
            class="block rounded border outline-none leading-tight appearance-none p-3 w-full"
          />
        </div>
        <!--origin-->
        <div class="block mb-5">
          <label for="origin" class="block font-medium mb-1 text-black">
            {{ locale[langService.language].Origin }}
          </label>
          <input
            id="origin"
            type="text"
            formControlName="origin"
            class="block rounded border outline-none leading-tight appearance-none p-3 w-full"
          />
        </div>
        <!--config-->
        <div class="block">
          <label for="config" class="block font-medium mb-1 text-black">
            {{ locale[langService.language].Config }}
          </label>
          <textarea
            id="config"
            class="block rounded border outline-none leading-tight appearance-none p-3 w-full"
            [class.border-rose-500]="form.status === 'INVALID' && form.touched"
            formControlName="config"
            rows="3"
            cols="70"
          ></textarea>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <div class="mx-4">
          <button type="submit" class="block rounded px-4 py-2 bg-blue-700 text-white">
            {{ sharedLocale[langService.language].Add }}
          </button>
        </div>
      </mat-dialog-actions>
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class SourceDialogComponent {
  protected readonly locale = locale;
  protected readonly sharedLocale = sharedLocale;
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
