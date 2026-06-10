import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseList } from '../../../shared/models/response-list.type';
import { Recipe } from '../models/recipe.interface';

@Injectable()
export class RecipeService {
  private onSearch = new Subject<ResponseList<Recipe>>();
  public onSearch$ = this.onSearch.asObservable();

  constructor(private readonly http: HttpClient) {}

  /**
   * Find recipes based on ingredients
   * @param token Recaptcha token
   * @param ingredients List of ingredient codenames
   */
  findRecipes(token = '', ingredients: string[]): Observable<ResponseList<Recipe>> {
    return this.http
      .get<ResponseList<Recipe>>(`${environment.SERVER_API}/recipe/by-ingredients`, {
        params: {
          'ingredients': ingredients,
          'token': token,
        },
      })
      .pipe(tap((recipes) => this.onSearch.next(recipes)));
  }
}
