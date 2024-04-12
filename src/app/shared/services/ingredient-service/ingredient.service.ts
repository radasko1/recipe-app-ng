import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IngredientPayload } from '../../../search-module/models/ingredient-payload.interface';
import { Ingredient } from '../../../search-module/models/ingredient.interface';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private list: Ingredient[] | undefined;

  constructor(private readonly http: HttpClient) {}

  /** Get list of Ingredient */
  getList() {
    if (this.list) {
      return of(this.list);
    }

    const url = environment.SERVER_API + '/ingredient';
    return this.http.get<Ingredient[]>(url).pipe(
      tap((list) => {
        this.list = list;
      })
    );
  }

  /**
   * Send HTTP request to create new Ingredient
   * @param ingredient
   */
  create(ingredient: IngredientPayload) {
    const url = `${environment.SERVER_API}/ingredient/create`;
    return this.http.post<Ingredient>(url, ingredient);
  }
}
