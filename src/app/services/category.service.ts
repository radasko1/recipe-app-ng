import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';

import { IngredientCategory } from '../modules/search/models/ingredient-category.interface';
import { environment } from '../../environments/environment';
import { Ingredient } from '../modules/search/models/ingredient.interface';

@Injectable()
export class CategoryService {
  private readonly subject = new BehaviorSubject<IngredientCategory[]>([]);

  constructor(private readonly http: HttpClient) {
    this.getCategoryData().subscribe();
  }

  /**
   * Get list of all Categories.
   * Response is saved to avoid call endpoint multiple times.
   */
  private getCategoryData(): Observable<IngredientCategory[]> {
    return this.http
      .get<IngredientCategory[]>(`${environment.SERVER_API}/ingredient/categories`)
      .pipe(tap((data) => this.subject.next(data)));
  }

  /**
   * Get Ingredients from all Categories
   */
  public getAllIngredients(): Observable<Ingredient[]> {
    return this.subject.pipe(
      // Transform each Category into an Observable of its Ingredients
      mergeMap((categories) => categories.map((category) => category.ingredientCategoryRels))
    );
  }

  /**
   * Get list of all categories with ingredients
   */
  public getCategories(): Observable<IngredientCategory[]> {
    return this.subject;
  }
}
