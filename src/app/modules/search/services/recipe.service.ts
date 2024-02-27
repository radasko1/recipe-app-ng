import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Recipe } from '../models/recipe.interface';

@Injectable()
export class RecipeService {
  private onSearch = new Subject<Recipe[]>();
  public onSearch$ = this.onSearch.asObservable();

  constructor(private readonly http: HttpClient) {}

  /**
   * Find recipes based on ingredients
   * @param ingredients List of ingredient codenames
   */
  findRecipes(ingredients: number[]): Observable<Recipe[]> {
    const queryParams = new HttpParams().set('ingredients', JSON.stringify(ingredients));
    return this.http
      .get<Recipe[]>(`${environment.SERVER_API}/recipe/by-ingredients`, {
        params: queryParams,
      })
      .pipe(
        tap({
          next: (recipes) => {
            this.onSearch.next(recipes);
          },
        })
      );
  }
}
