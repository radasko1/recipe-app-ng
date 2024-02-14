import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { IngredientCategory } from "../models/ingredient-category.interface";
import { environment } from "../../environments/environment";

@Injectable()
export class CategoryService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of all categories with ingredients
   */
  getCategories(): Observable<IngredientCategory[]> {
    return this.http.get<IngredientCategory[]>(`${environment.SERVER_API}/ingredient/categories`);
  }
}
