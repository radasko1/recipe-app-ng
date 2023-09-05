import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppService } from './app.service';
import { map, Subject, takeUntil } from 'rxjs';
import { Recipe } from './models/recipe.interface';
import { FormIngredient } from './models/form-ingredient.interface';
import { Language } from './types/language.type';
import { LanguageService } from './app-language.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="list my-4">
        <span
          *ngFor="let ingredient of ingredientList; last as isLast"
          role="button"
          class="badge cursor-pointer"
          [class.text-bg-warning]="ingredient.selected"
          [class.text-bg-light]="!ingredient.selected"
          [class.me-1]="!isLast"
          (click)="selectIngredient(ingredient)"
        >
          {{
            ingredient.locale[currentLanguage]
              ? ingredient.locale[currentLanguage]
              : ingredient.name
          }}
        </span>
      </div>
      <button class="btn btn-primary" (click)="submit()">Odeslat</button>
      <div class="row mt-4" *ngIf="recipeList.length">
        <div *ngFor="let recipe of recipeList; last as isLast" class="card" [class.mb-3]="!isLast">
          <div class="card-body">
            <h5 class="card-title">{{ recipe.name }}</h5>
            <p class="card-text">
              <span *ngFor="let child of recipe.ingredientList">{{ child.name }},</span>
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
  protected ingredientList: FormIngredient[] = [];
  protected recipeList: Recipe[] = [];
  protected currentLanguage: Language = this.langService.language;

  constructor(
    private appService: AppService,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.appService
      .getIngredients()
      .pipe(
        map((ingredientList) => {
          return ingredientList.map((ingr) => {
            // change type of Ingredient item
            const item = ingr as FormIngredient;
            item.selected = false;
            return item;
          });
        }),
        takeUntil(this.subscription)
      )
      .subscribe((list) => {
        this.ingredientList = list;
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
    const ingredientNames = this.ingredientList
      .filter((ingredient) => ingredient.selected)
      .map((ing) => ing.name);

    this.appService.findRecipes(ingredientNames).subscribe({
      next: (response) => {
        this.recipeList = response;
      },
    });
  }
}
