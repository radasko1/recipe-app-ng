import { Component, inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { IngredientService } from '../../../../shared/services/ingredient-service/ingredient.service';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { TimestampService } from '../../../../shared/services/timestamp/timestamp.service';
import { Ingredient } from '../../models/ingredient.interface';
import locale from './search-bar.locale.json';
import { IngredientModalComponent } from '../ingredient-modal/ingredient-modal.component';
import { IngredientDialogService } from '../../services/ingredient-dialog.service';
import { RecipeService } from '../../services/recipe.service';

/** Interval to wait before you can submit again search button */
const INTERVAL = 2;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent implements OnDestroy {
  /** Timestamp when were submitted search form */
  private prevTimestamp: number | undefined;
  private subs = new Subject<boolean>();
  protected readonly locale = locale;
  protected readonly ingredientList$ = this.ingredientService.getList();
  private readonly timestampService = inject(TimestampService);
  private readonly recaptchaService = inject(ReCaptchaV3Service);

  constructor(
    protected readonly langService: LanguageService,
    protected readonly ingredientDialogService: IngredientDialogService,
    private readonly ingredientService: IngredientService,
    private readonly recipeService: RecipeService,
    private readonly dialog: MatDialog
  ) {}

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }

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

    this.recaptchaService
      .execute('submit')
      .pipe(
        switchMap((token) => this.recipeService.findRecipes(token, ids)),
        takeUntil(this.subs)
      )
      .subscribe();
  }
}
