import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, takeUntil } from 'rxjs';

import { AppService } from './app.service';
import { Recipe } from './models/recipe.interface';
import { FormIngredient } from './models/form-ingredient.interface';
import { Language } from './types/language.type';
import { LanguageService } from './app-language.service';
import locale from './app.locale.json';
import { IngredientCategory } from './models/ingredient-category.interface';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="row mt-3">
        <div class="col-3">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary"
              [class.active]="currentLanguage === 'en'"
              (click)="changeLanguage('en')"
            >
              {{ locale[currentLanguage].English }}
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              [class.active]="currentLanguage === 'cs'"
              (click)="changeLanguage('cs')"
            >
              {{ locale[currentLanguage].Czech }}
            </button>
          </div>
        </div>
      </div>
      <div class="list my-4">
        <div *ngFor="let cat of ingredientCategoryList; last as icLast" [class.mb-3]="!icLast">
          <h2>{{ cat.locale[currentLanguage] }}</h2>
          <span
            *ngFor="let ingredient of cat.ingredients; last as iLast"
            role="button"
            class="badge cursor-pointer"
            [class.text-bg-warning]="ingredient.selected"
            [class.text-bg-light]="!ingredient.selected"
            [class.me-1]="!iLast"
            (click)="selectIngredient(ingredient)"
          >
            {{
              ingredient.locale[currentLanguage]
                ? ingredient.locale[currentLanguage]
                : ingredient.name
            }}
          </span>
        </div>
      </div>
      <button class="btn btn-primary" (click)="submit()">
        {{ locale[currentLanguage].FindRecipes }}
      </button>
      <div class="row mt-4" *ngIf="recipeList.length">
        <div *ngFor="let recipe of recipeList; last as rLast" class="card" [class.mb-3]="!rLast">
          <div class="card-body">
            <h5 class="card-title">{{ recipe.name }}</h5>
            <p class="card-text">
              <span
                *ngFor="let selectIngredient of recipe.selectedIngredients; last as siLast"
                class="badge text-bg-success"
                [class.me-1]="!siLast"
              >
                {{
                  selectIngredient.locale[currentLanguage]
                    ? selectIngredient.locale[currentLanguage]
                    : selectIngredient.name
                }}
              </span>
              <span
                *ngFor="let requestIngredient of recipe.requiredIngredients; last as riLast"
                class="badge text-bg-light"
                [class.me-1]="!riLast"
              >
                {{
                  requestIngredient.locale[currentLanguage]
                    ? requestIngredient.locale[currentLanguage]
                    : requestIngredient.name
                }}
              </span>
            </p>
            <a [href]="recipe.link" target="_blank" class="card-link">Link to the recipe</a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription = new Subject<boolean>();
  protected ingredientCategoryList: IngredientCategory[] = [];
  protected recipeList: Recipe[] = [];
  protected currentLanguage: Language = this.langService.language;

  constructor(
    private appService: AppService,
    private langService: LanguageService
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

    // Listen to language change
    this.langService.languageChange$.pipe(takeUntil(this.subscription)).subscribe({
      next: (lang) => {
        this.currentLanguage = lang;
      },
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

  protected readonly locale = locale;
}
