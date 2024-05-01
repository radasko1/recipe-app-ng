import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientService } from '../../../shared/services/ingredient-service/ingredient.service';
import { TimestampService } from '../../../shared/services/timestamp/timestamp.service';
import { Ingredient } from '../../models/ingredient.interface';
import locale from './search-bar.locale.json';
import { IngredientModalComponent } from '../ingredient-modal/ingredient-modal.component';
import { IngredientDialogService } from '../../services/ingredient-dialog.service';
import { RecipeService } from '../../services/recipe.service';
import { LanguageService } from '../../../shared/services/language-service/language.service';

/** Interval to wait before you can submit again search button */
const INTERVAL = 2;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent {
  /** Timestamp when were submitted search form */
  private prevTimestamp: number | undefined;
  protected readonly locale = locale;
  protected readonly ingredientList$ = this.ingredientService.getList();
  private readonly timestampService = inject(TimestampService);

  constructor(
    protected readonly langService: LanguageService,
    protected readonly ingredientDialogService: IngredientDialogService,
    private readonly ingredientService: IngredientService,
    private readonly recipeService: RecipeService,
    private readonly dialog: MatDialog
  ) {}

  /**
   * Whether search form can be submitted
   * @private
   */
  private canSubmit() {
    if (this.prevTimestamp === undefined) {
      return true;
    }
    return this.timestampService.currentTimestamp > this.prevTimestamp + INTERVAL;
  }

  protected openIngredientDialog() {
    const dialogRef = this.dialog.open(IngredientModalComponent);
  }

  /**
   * Select Ingredient from Autocomplete component
   * @param selectedItem
   * @protected
   */
  protected onSelect(selectedItem: Ingredient) {
    if (!selectedItem) {
      return;
    }
    this.ingredientDialogService.ingredientSelect(selectedItem);
  }

  /**
   * Search form submit handler
   * @protected
   */
  protected onSearch() {
    if (!this.canSubmit()) {
      return;
    }
    this.prevTimestamp = this.timestampService.currentTimestamp;

    const selectedIngredients = this.ingredientDialogService.selectedList;
    if (!selectedIngredients.length) {
      return;
    }
    const ids = selectedIngredients.map((ingredient) => ingredient.id);

    this.recipeService.findRecipes(ids).subscribe();
  }
}
