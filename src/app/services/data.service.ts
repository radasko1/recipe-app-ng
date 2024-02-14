import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe.interface';
import { IngredientCategory } from '../models/ingredient-category.interface';

@Injectable()
export class DataService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of all categories with ingredients
   */
  getCategories(): Observable<IngredientCategory[]> {
    return this.http.get<IngredientCategory[]>(`${environment.SERVER_API}/ingredient/categories`);
  }

  /**
   * Find recipes based on ingredients
   * @param ingredientNames
   */
  findRecipes(ingredientNames: string[]): Observable<Recipe[]> {
    return this.http.post<Recipe[]>(`${environment.SERVER_API}/recipe/ingredients`, {
      ingredients: ingredientNames,
    });
  }
}
