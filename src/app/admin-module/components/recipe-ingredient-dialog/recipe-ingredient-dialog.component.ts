import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { LocaleFileKey } from '../../../localization-module/models/locale-file-key.type';
import { GeneralLocale } from '../../../localization-module/services/general-locale.token';
import { Ingredient } from '../../../search-module/models/ingredient.interface';
import { IngredientService } from '../../../shared/services/ingredient-service/ingredient.service';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { RecipeIngredientDialogData } from '../../models/recipe-ingredient-dialog-data.type';

@Component({
  selector: 'app-recipe-ingredient-dialog',
  templateUrl: 'recipe-ingredient-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeIngredientDialogComponent implements OnInit, OnDestroy {
  private subs = new Subject<boolean>();
  protected ingredientList: Ingredient[] = [];
  protected transformedList: Ingredient[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: RecipeIngredientDialogData,
    @Inject(GeneralLocale) protected generalLocale: LocaleFileKey,
    protected readonly lang: LanguageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly dialogRef: MatDialogRef<RecipeIngredientDialogComponent>,
    private readonly ingredientService: IngredientService
  ) {}

  ngOnInit() {
    // TODO load in template with async?
    this.ingredientService
      .getList()
      .pipe(takeUntil(this.subs))
      .subscribe((value) => {
        this.ingredientList = value;
        this.transformedList = this.assignIngredients(value);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }

  /**
   * Find Ingredient objects by ID's from Dialog data property 'list'
   * @param list List of all Ingredient objects
   */
  private assignIngredients(list: Ingredient[]) {
    return this.data.list
      .map((id) => list.find((ingredient) => ingredient.id === id))
      .filter((ingredient) => ingredient !== undefined) as Ingredient[];
  }

  /** Replace collection 'requiredIngredients' with list from this dialog */
  protected addToCollection() {
    const idList = this.transformedList.map((ing) => ing.id);
    const str = JSON.stringify(idList);
    this.data.onSave(str);

    this.dialogRef.close();
  }
}
