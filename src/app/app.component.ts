import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Ingredient } from './models/ingredient.interface';
import { map, Subject, takeUntil } from 'rxjs';
import { getXHRResponse } from 'rxjs/internal/ajax/getXHRResponse';
import { Recipe } from './models/recipe.interface';
import { FormIngredient } from './models/form-ingredient.interface';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="list my-4">
        <span
          *ngFor="let ingredientItem of ingredientList"
          role="button"
          class="badge cursor-pointer"
          [class.text-bg-warning]="ingredientItem.selected"
          [class.text-bg-light]="!ingredientItem.selected"
          (click)="selectIngredient(ingredientItem)"
          >{{ ingredientItem.name }}</span
        >
      </div>
      <button class="btn btn-primary" (click)="submit()">Odeslat</button>
      <div class="row mt-4" *ngIf="recipeList.length">
        <div *ngFor="let recipe of recipeList" class="card">
          <div class="card-body">
            <h5 class="card-title">{{ recipe.name }}</h5>
            <p class="card-text">
              <span *ngFor="let child of recipe.ingredientList">{{ child.name }},</span>
            </p>
            <a [href]="recipe.link" class="card-link">Link to the recipe</a>
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

  constructor(private appService: AppService) {}

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
