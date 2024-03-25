import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { LanguageService } from '../../shared/services/language-service/language.service';
import locale from '../admin.locale.json';
import sharedLocale from '../../shared/general.locale.json';

type SourcePageDialog = {
  source: string;
  onSubmit: (data: { source: string; url: string }) => void;
};

@Component({
  selector: 'app-source-page-dialog',
  template: `
    <h2 mat-dialog-title class="text-black">{{ locale[langService.language].LinkToSource }}</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <!--source-->
        <div class="block mb-5">
          <label for="name" class="block font-medium mb-1 text-black">
            {{ locale[langService.language].Source }}
          </label>
          <input
            id="name"
            type="text"
            formControlName="source"
            class="block rounded border outline-none leading-tight appearance-none p-3 w-full"
          />
        </div>
        <!--url-->
        <div class="block">
          <label for="url" class="block font-medium mb-1 text-black">
            {{ locale[langService.language].Link }}
          </label>
          <textarea
            id="url"
            class="block rounded border outline-none leading-tight appearance-none p-3 w-full"
            [class.border-rose-500]="form.status === 'INVALID' && form.touched"
            formControlName="url"
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
export class SourcePageDialogComponent {
  protected readonly locale = locale;
  protected readonly sharedLocale = sharedLocale;
  protected readonly form = this.fb.group({
    source: this.fb.control<string>(
      { value: this.data.source, disabled: true },
      { validators: [Validators.required, Validators.minLength(1)] }
    ),
    url: this.fb.control<string>('', {
      validators: [Validators.required, Validators.minLength(1)],
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: SourcePageDialog,
    protected readonly langService: LanguageService,
    private readonly dialogRef: MatDialogRef<SourcePageDialogComponent>,
    private readonly fb: NonNullableFormBuilder
  ) {}

  protected onSubmit() {
    if (this.form.status === 'INVALID') {
      return;
    }

    this.data.onSubmit(this.form.getRawValue());
    this.form.reset();
    this.dialogRef.close();
  }
}
