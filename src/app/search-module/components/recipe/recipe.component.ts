import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subject, takeUntil } from 'rxjs';

import { Recipe } from '../../models/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import locale from './recipe.locale.json';
import { LanguageService } from '../../../shared/services/language-service/language.service';
import { ResponseList } from '../../../shared/models/response-list.type';
import generalLocale from '../../../shared/general.locale.json';

@Component({
  selector: 'app-recipe',
  template: `
    <!--TODO split into more components-->
    <!--List of Recipes-->
    <ng-template [ngIf]="recipeList && recipeList.length">
      <!--Single Recipe-->
      <div
        *ngFor="
          let recipe of recipeList.list | slice: pageIndex * pageSize : (pageIndex + 1) * pageSize;
          last as rLast
        "
        class="block py-8 border-b-[1px] border-gray-200"
        [class.mb-6]="!rLast"
      >
        <div class="flex gap-4">
          <div class="w-1/4">
            <img [src]="recipe.image_url" [alt]="recipe.name" class="img-fluid" />
          </div>
          <div class="w-3/4">
            <h5 class="text-2xl font-semibold mb-3">{{ recipe.name }}</h5>
            <div class="inline-flex items-center mb-4">
              <!--cooking time-->
              <div class="inline-flex items-center mr-6">
                <mat-icon fontIcon="schedule" class="mr-1"></mat-icon>
                <span class="text-sm text-gray-600">
                  <em>{{ generalLocale[lang.language].Unknown | lowercase }}</em>
                </span>
              </div>
              <!--calories-->
              <div class="inline-flex items-center">
                <mat-icon fontIcon="info" class="mr-1"></mat-icon>
                <span class="text-sm text-gray-600">
                  <em>{{ generalLocale[lang.language].Unknown | lowercase }}</em>
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-1 mb-4">
              <!--selected = available (green)-->
              <span
                *ngFor="let selectIngredient of recipe.selectedIngredients"
                class="inline-flex items-center gap-1 bg-green-600 text-gray-50 rounded-md px-2 py-1 text-xs font-medium"
              >
                {{ selectIngredient.locale[lang.language] }}
              </span>
              <!--required = unavailable (red)-->
              <span
                *ngFor="let requestIngredient of recipe.requiredIngredients"
                class="inline-flex items-center gap-1 bg-red-500 text-white rounded-md px-2 py-1 text-xs font-medium"
              >
                {{ requestIngredient.locale[lang.language] }}
              </span>
              <!--optional = don't need (orange)-->
              <span
                *ngFor="let requestIngredient of recipe.optionalIngredients"
                class="inline-flex items-center gap-1 bg-amber-300 text-white rounded-md px-2 py-1 text-xs font-medium"
              >
                {{ requestIngredient.locale[lang.language] }}
              </span>
            </div>
            <!--link-->
            <div class="inline-flex items-center">
              <mat-icon fontIcon="link"></mat-icon>
              <a
                [href]="recipe.link"
                target="_blank"
                class="inline-block ml-2"
                rel="noreferrer noopener"
              >
                {{ locale[lang.language].Link }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!--Paginator-->
      <mat-paginator
        #paginator
        [length]="recipeList.length"
        [pageSize]="pageSize"
        [pageIndex]="pageIndex"
        (page)="onPage($event)"
      ></mat-paginator>
    </ng-template>

    <!--Empty Recipe list result-->
    <ng-template [ngIf]="recipeList && !recipeList.length">
      <div class="block w-full bg-blue-100 text-blue-700 rounded p-5">
        <p class="text-medium">{{ locale[lang.language].EmptySearchResult }}</p>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class RecipeComponent implements OnInit, OnDestroy {
  private readonly subs = new Subject<boolean>();
  protected readonly locale = locale;
  protected readonly generalLocale = generalLocale;
  protected recipeList: ResponseList<Recipe> | undefined;
  //
  protected pageIndex = 0;
  protected readonly pageSize = 5;

  constructor(
    protected readonly lang: LanguageService,
    private readonly recipeService: RecipeService
  ) {}

  ngOnInit() {
    // Load all Recipes for paginator to avoid re-fetch everytime use go to next/prev page
    this.recipeService.onSearch$.pipe(takeUntil(this.subs)).subscribe((recipes) => {
      this.recipeList = recipes;
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
