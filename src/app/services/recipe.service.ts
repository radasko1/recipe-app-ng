import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Recipe } from '../models/recipe.interface';

@Injectable()
export class RecipeService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Find recipes based on ingredients
   * @param ingredients List of ingredient codenames
   */
  findRecipes(ingredients: string[]): Observable<Recipe[]> {
    return this.http.post<Recipe[]>(`${environment.SERVER_API}/recipe/ingredients`, {
      ingredients,
    });
  }
}
