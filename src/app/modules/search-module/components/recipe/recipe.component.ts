import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { catchError, map, of, Subject, takeUntil, withLatestFrom } from 'rxjs';
import { LanguageService } from '../../../../shared/services/language-service/language.service';
import { Recipe } from '../../models/recipe.interface';
import { RecipeLoaderService } from '../../services/recipe-loader.service';
import { RecipeService } from '../../services/recipe.service';
import locale from './recipe.locale.json';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '["relative"]',
  },
})
export class RecipeComponent implements OnInit, OnDestroy {
  protected readonly lang = inject(LanguageService);
  protected readonly recipeService = inject(RecipeService);
  protected readonly recipeLoader = inject(RecipeLoaderService);

  // Loading indicator
  protected readonly loading$ = this.recipeLoader.loading$;
  // List of Recipes
  protected recipeList$ = this.recipeService.onSearch$.pipe(
    // Stop loader - finalize doesn't work
    map((recipeList) => {
      this.recipeLoader.stop();
      return recipeList.list;
    }),
    catchError(() => {
      const emptyList: Recipe[] = [];
      return of(emptyList);
    })
  );
  // Whether there is no Recipe in list after fetch
  protected emptyRecipeList$ = this.recipeList$.pipe(
    withLatestFrom(this.loading$),
    map(([list, loading]) => !list.length && !loading)
  );

  private readonly subs = new Subject<boolean>();
  protected readonly locale = locale;
  // Initial page index for paginator
  protected pageIndex = 0;
  // Show 16 cards on page - 4 rows and 4 cols
  protected readonly pageSize = 16;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Listen for language change
    this.lang.onLanguageChange$.pipe(takeUntil(this.subs)).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }

  /**
   * On page change in Paginator
   * @param event
   */
  protected onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }
}
