import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { LocaleFileKey } from '../../../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { CategoryService } from '../../services/category.service';
import { Ingredient } from '../../models/ingredient.interface';
import { IngredientDialogService } from '../../services/ingredient-dialog.service';

@Component({
  selector: 'app-ingredient-modal',
  templateUrl: './ingredient-modal.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IngredientModalComponent {
  protected readonly categoryList$ = this.categoryService.loadCategories();

  constructor(
    @Inject(GeneralLocale) protected generalLocale: LocaleFileKey,
    protected readonly langService: LanguageService,
    private readonly ingredientDialogService: IngredientDialogService,
    private readonly categoryService: CategoryService
  ) {}

  /**
   * Toggle selected state of clicked Ingredient
   * @param ingredient
   * @param state
   * @protected
   */
  protected toggleSelectedState(ingredient: Ingredient, state: boolean) {
    this.ingredientDialogService.toggleIngredientSelection(ingredient, state);
  }
}
