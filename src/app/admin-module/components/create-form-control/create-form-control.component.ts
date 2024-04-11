import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import sharedLocale from '../../../shared/general.locale.json';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { CreateFormControlData } from '../../models/create-form-control-data.type';
import locale from './create-form-control.locale.json';

@Component({
  selector: 'app-create-form-control',
  templateUrl: './create-form-control.component.html',
})
export class CreateFormControlComponent {
  protected readonly sharedLocale = sharedLocale;
  protected readonly locale = locale;
  protected fieldName = new FormControl<string>('', {
    // TODO pattern - only letters (except czech letters)
    validators: [Validators.required, Validators.minLength(1)],
    nonNullable: true,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) protected readonly data: CreateFormControlData,
    protected readonly languageService: LanguageService,
    private readonly dialogRef: MatDialogRef<CreateFormControlComponent>
  ) {}

  /**
   * Create button handler
   * @protected
   */
  protected create() {
    if (this.fieldName.invalid) {
      return;
    }
    const formControlName = this.fieldName.value;
    this.data.onSave(formControlName);
    this.fieldName.reset();
    this.dialogRef.close();
  }
}
