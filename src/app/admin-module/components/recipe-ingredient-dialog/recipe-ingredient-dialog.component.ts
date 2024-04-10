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
import { Ingredient } from '../../../search-module/models/ingredient.interface';
import sharedLocale from '../../../shared/general.locale.json';
import { IngredientService } from '../../../shared/services/ingredient-service/ingredient.service';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { RecipeIngredientDialogData } from '../../models/recipe-ingredient-dialog-data.type';

@Component({
  selector: 'app-recipe-ingredient-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.dialogTitle }}</h2>
    <mat-dialog-content>
      <app-recipe-detail-checkbox-list
        [list]="transformedList"
        [dataService]="data.serviceInstance"
        [showAutocomplete]="true"
        [autocompleteList]="ingredientList"
      />
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <div class="mx-4 w-full">
        <button
          mat-dialog-close
          type="button"
          class="inline-block rounded px-4 py-2 bg-black text-white mr-2"
        >
          {{ sharedLocale[lang.language].Close }}
        </button>
        <button
          type="button"
          class="inline-block rounded px-4 py-2 bg-blue-700 text-white"
          (click)="addToCollection()"
        >
          {{ sharedLocale[lang.language].Save }}
        </button>
      </div>
    </mat-dialog-actions>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeIngredientDialogComponent implements OnInit, OnDestroy {
  private subs = new Subject<boolean>();
  protected readonly sharedLocale = sharedLocale;
  protected ingredientList: Ingredient[] = [];
  protected transformedList: Ingredient[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: RecipeIngredientDialogData,
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
