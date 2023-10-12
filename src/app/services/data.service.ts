import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Ingredient } from '../models/ingredient.interface';
import { Recipe } from '../models/recipe.interface';
import { IngredientCategory } from '../models/ingredient-category.interface';

@Injectable()
export class DataService {
  private readonly url = `${environment.recipeAppExpressUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  /**
   * Get list of all ingredients
   */
  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.url}/ingredient`);
  }

  /**
   * Get list of all categories with ingredients
   */
  getCategories(): Observable<IngredientCategory[]> {
    return this.http.get<IngredientCategory[]>(`${this.url}/ingredient/categories`);
  }

  /**
   * Find recipes based on ingredients
   * @param ingredientNames
   */
  findRecipes(ingredientNames: string[]): Observable<Recipe[]> {
    return this.http.post<Recipe[]>(`${this.url}/recipe/ingredients`, {
      ingredients: ingredientNames,
    });
  }
}
