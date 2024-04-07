import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import sharedLocale from '../../shared/general.locale.json';
import locale from '../admin.locale.json';
import { Localized } from '../../shared/models/localized.type';
import { LanguageService } from '../../shared/services/language-service/language.service';
import { DataCollectionService } from '../services/data-collection.service';

interface TitleForm {
  title: string;
  czech: string;
  english: string;
}
type TitleFormGroup = {
  [P in keyof TitleForm]: FormControl<TitleForm[P]>;
};
type DialogData = {
  id: string;
  title: string | null;
  locale: Localized | null;
};

@Component({
  selector: 'recipe-title-dialog',
  template: `
    <h2 mat-dialog-title class="text-black">{{ locale[langService.language].LocalizedTitle }}</h2>
    <mat-dialog-content>
      <form [formGroup]="titleForm">
        <!--title-->
        <div class="block mb-5">
          <label for="title" class="block font-medium mb-1 text-black">
            {{ locale[langService.language].Title }}
          </label>
          <input
            id="title"
            type="text"
            formControlName="title"
            class="block rounded border outline-none leading-tight appearance-none p-3 w-96"
          />
        </div>
        <!--czech-->
        <div class="block mb-5">
          <label for="czech" class="block font-medium mb-1 text-black">
            {{ locale[langService.language].CzechLanguage }}
          </label>
          <input
            id="czech"
            type="text"
            formControlName="czech"
            class="block rounded border outline-none leading-tight appearance-none p-3 w-96"
          />
        </div>
        <!--english-->
        <div class="block mb-5">
          <label for="english" class="block font-medium mb-1 text-black">
            {{ locale[langService.language].EnglishLanguage }}
          </label>
          <input
            id="english"
            type="text"
            formControlName="english"
            class="block rounded border outline-none leading-tight appearance-none p-3 w-96"
          />
        </div>
      </form>
      <mat-dialog-actions align="end">
        <button
          type="button"
          class="block rounded px-4 py-2 bg-blue-700 text-white"
          (click)="save()"
        >
          {{ sharedLocale[langService.language].Save }}
        </button>
      </mat-dialog-actions>
    </mat-dialog-content>
  `,
})
export class RecipeTitleDialogComponent {
  protected readonly locale = locale;
  protected readonly sharedLocale = sharedLocale;
  protected readonly titleForm: FormGroup<TitleFormGroup>;

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: DialogData,
    private readonly dialogRef: MatDialogRef<RecipeTitleDialogComponent>,
    private readonly fb: NonNullableFormBuilder,
    private readonly dataCollectionService: DataCollectionService,
    protected readonly langService: LanguageService
  ) {
    const dialogData = this.data;

    this.titleForm = this.fb.group<TitleFormGroup>({
      title: this.fb.control(dialogData.title ?? '', { validators: [Validators.required] }),
      czech: this.fb.control(dialogData.locale?.cs ?? '', { validators: [Validators.required] }),
      english: this.fb.control(dialogData.locale?.en ?? '', { validators: [Validators.required] }),
    });
  }

  /**
   * Save localized title
   */
  protected save() {
    if (this.titleForm.invalid) {
      return;
    }

    const formData = this.titleForm.getRawValue();
    const id = parseInt(this.data.id, 10);

    this.dataCollectionService
      .updatePageTitleLocale(id, formData.title, { cs: formData.czech, en: formData.english })
      .subscribe({
        next: () => {
          this.dialogRef.close();
          // TODO message + update page?
        },
        error: () => {
          // TODO message
        },
      });
  }
}
