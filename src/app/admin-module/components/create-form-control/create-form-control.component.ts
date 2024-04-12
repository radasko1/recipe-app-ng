import { Component, Inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import sharedLocale from '../../../shared/general.locale.json';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { CreateFormControlData } from '../../models/create-form-control-data.type';
import locale from './create-form-control.locale.json';

type FieldNameForm = {
  name: string;
};
type FieldNameFormGroup = {
  [P in keyof FieldNameForm]: FormControl<FieldNameForm[P]>;
};

@Component({
  selector: 'app-create-form-control',
  templateUrl: './create-form-control.component.html',
})
export class CreateFormControlComponent {
  protected readonly sharedLocale = sharedLocale;
  protected readonly locale = locale;
  protected readonly fieldNameFormGroup = this.formBuilder.group<FieldNameFormGroup>({
    name: this.formBuilder.control<string>('', {
      validators: [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z]+$')],
    }),
    // locale: this.formBuilder.control()
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) protected readonly data: CreateFormControlData,
    protected readonly languageService: LanguageService,
    private readonly dialogRef: MatDialogRef<CreateFormControlComponent>,
    private readonly formBuilder: NonNullableFormBuilder
  ) {}

  /**
   * Create button handler
   * @protected
   */
  protected create() {
    if (this.fieldNameFormGroup.invalid) {
      return;
    }
    const formControlName = this.fieldNameFormGroup.controls.name.value;
    this.data.onSave(formControlName);
    this.fieldNameFormGroup.reset();
    this.dialogRef.close();
  }
}
