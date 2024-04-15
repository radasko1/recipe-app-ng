import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { catchError, of, Subject, takeUntil, tap } from 'rxjs';
import { ResponseList } from '../../../shared/models/response-list.type';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import locale from './recipe.locale.json';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RecipeComponent implements OnInit, OnDestroy {
  private readonly subs = new Subject<boolean>();
  protected readonly locale = locale;
  protected recipeList: ResponseList<Recipe> | undefined;
  protected pageIndex = 0;
  protected readonly pageSize = 5;

  constructor(
    protected readonly lang: LanguageService,
    private readonly recipeService: RecipeService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Listen for language change
    this.lang.onLanguageChange$.pipe(takeUntil(this.subs)).subscribe(() => {
      this.cdr.markForCheck();
    });
    // Load all Recipes for paginator to avoid re-fetch everytime use go to next/prev page
    this.recipeService.onSearch$
      .pipe(
        takeUntil(this.subs),
        tap((recipes) => {
          // Update data and trigger change detection:
          this.recipeList = recipes;
          this.updateView();
        }),
        catchError((err) => {
          // Handle error and reset state:
          this.recipeList = undefined;
          this.updateView();
          return of(undefined);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subs.next(true);
    this.subs.unsubscribe();
  }

  /**
   * Reset recipe list paginator (redirect you on the first page) and update view
   */
  private updateView() {
    this.pageIndex = 0;
    this.cdr.markForCheck();
  }

  /**
   * On page change in Paginator
   * @param event
   */
  protected onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
  }
}
