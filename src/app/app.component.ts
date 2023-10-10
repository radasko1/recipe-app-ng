import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';

import { AppService } from './services/app.service';
import { Recipe } from './models/recipe.interface';
import { FormIngredient } from './models/form-ingredient.interface';
import { Language } from './types/language.type';
import { LanguageService } from './services/app-language.service';
import locale from './app.locale.json';
import { IngredientCategory } from './models/ingredient-category.interface';

@Component({
  selector: 'app-root',
  template: `
    <div class="">
      <!--navigation-->
      <nav></nav>
      <!--promo text-->
      <div class="promo-text"></div>
      <!--search bar-->
      <div class="search-bar">
        <app-search-bar></app-search-bar>
      </div>

      <div class="row mt-3">
        <div class="col-3">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary"
              [class.active]="langService.language === 'en'"
              (click)="changeLanguage('en')"
            >
              {{ locale[langService.language].English }}
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              [class.active]="langService.language === 'cs'"
              (click)="changeLanguage('cs')"
            >
              {{ locale[langService.language].Czech }}
            </button>
          </div>
        </div>
      </div>
      <div class="row list my-4">
        <div
          *ngFor="let cat of ingredientCategoryList; last as icLast"
          [class.mb-3]="!icLast"
          class="col-4"
        >
          <h2>{{ cat.locale[langService.language] }}</h2>
          <span
            *ngFor="let ingredient of cat.ingredients; last as iLast"
            role="button"
            class="badge cursor-pointer"
            [class.text-bg-warning]="ingredient.selected"
            [class.text-bg-light]="!ingredient.selected"
            [class.me-1]="!iLast"
            (click)="selectIngredient(ingredient)"
          >
            {{ ingredient.locale[langService.language] }}
          </span>
        </div>
      </div>
      <button class="btn btn-primary" (click)="submit()">
        {{ locale[langService.language].FindRecipes }}
      </button>
      <div class="row mt-4" *ngIf="recipeList.length">
        <div
          *ngFor="let recipe of recipeList; last as rLast"
          class="col-md-6"
          [class.mb-3]="!rLast"
        >
          <div class="card">
            <div class="row g-0">
              <div class="col-md-4">
                <img [src]="recipe.image_url" [alt]="recipe.name" class="img-fluid" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title mb-3">{{ recipe.name }}</h5>
                  <p class="card-text">
                    <span
                      *ngFor="let selectIngredient of recipe.selectedIngredients; last as siLast"
                      class="badge text-bg-success"
                      [class.me-1]="!siLast"
                    >
                      {{ selectIngredient.locale[langService.language] }}
                    </span>
                    <span
                      *ngFor="let requestIngredient of recipe.requiredIngredients; last as riLast"
                      class="badge text-bg-light"
                      [class.me-1]="!riLast"
                    >
                      {{ requestIngredient.locale[langService.language] }}
                    </span>
                  </p>
                  <a [href]="recipe.link" target="_blank" class="card-link">Link to the recipe</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();
  protected readonly locale = locale;
  protected ingredientCategoryList: IngredientCategory[] = [];
  protected recipeList: Recipe[] = [];

  constructor(
    private appService: AppService,
    protected langService: LanguageService
  ) {}

  ngOnInit() {
    this.appService
      .getCategories()
      .pipe(
        map((categoryList) => {
          return categoryList.map((cat) => {
            // change type of Ingredient item
            cat.ingredients = cat.ingredientCategoryRels.map((ing) => {
              const ingredient = ing as FormIngredient;
              ingredient.selected = false;
              return ingredient;
            });
            return cat;
          });
        }),
        takeUntil(this.subscription)
      )
      .subscribe((list) => {
        this.ingredientCategoryList = list;
      });
  }

  ngOnDestroy() {
    this.subscription.next(true);
    this.subscription.unsubscribe();
  }

  /**
   * Toggle item selection status
   * @param item
   */
  protected selectIngredient(item: FormIngredient) {
    item.selected = !item.selected;
  }

  /**
   * Submit selected ingredients
   */
  protected submit() {
    const categoryList = this.ingredientCategoryList;
    const ingredientNames: string[] = [];

    for (const category of categoryList) {
      for (const ingredient of category.ingredients) {
        if (ingredient.selected) {
          ingredientNames.push(ingredient.name);
        }
      }
    }

    this.appService.findRecipes(ingredientNames).subscribe({
      next: (response) => {
        this.recipeList = response;
      },
    });
  }

  /**
   * Change current language
   * @param lang
   */
  protected changeLanguage(lang: Language) {
    this.langService.language = lang;
  }
}
