import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { LocaleFileKey } from '../../../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { Locale } from '../../../search-module/models/locale.interface';
import { CategoryService } from '../../../search-module/services/category.service';
import { IngredientService } from '../../../shared/services/ingredient-service/ingredient.service';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { SnackBarService } from '../../../shared/services/snackbar/snackbar.service';
import locale from './create-ingredient.locale.json';

interface IngredientForm {
  name: string;
  locale: string;
  category: string;
}
type IngredientFormGroup = {
  readonly [P in keyof IngredientForm]: FormControl<IngredientForm[P]>;
};

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create-ingredient.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CategoryService],
})
export class CreateIngredientComponent {
  protected readonly locale = locale;
  protected readonly formGroup = this.formBuilder.group<IngredientFormGroup>({
    name: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(1), Validators.pattern('^[a-z_]+$')],
    }),
    locale: this.formBuilder.control('{"cs":"ABC","en":"ABC"}', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    category: this.formBuilder.control('', {
      validators: [Validators.required],
    }),
  });
  protected readonly categoryList$ = this.categoryService.loadCategories();

  constructor(
    @Inject(GeneralLocale) protected generaLocale: LocaleFileKey,
    protected readonly languageService: LanguageService,
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly categoryService: CategoryService,
    private readonly ingredientService: IngredientService,
    private readonly snackbar: SnackBarService
  ) {}

  /**
   * Form submit button handler
   * @protected
   */
  protected onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    const { name, locale, category } = this.formGroup.value as IngredientForm;
    const category_id = parseInt(category, 10);
    const localization = JSON.parse(locale) as Locale;
    this.ingredientService
      .create({ name, locale: localization, category_id })
      .pipe(
        finalize(() => {
          this.formGroup.reset();
        })
      )
      .subscribe({
        next: () => {
          this.snackbar.showSimpleMessage(
            this.locale[this.languageService.language].CreatedSuccessMessage
          );
        },
        error: () => {
          this.snackbar.showSimpleMessage(
            this.locale[this.languageService.language].CreatedFailedMessage
          );
        },
      });
  }
}
