import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IngredientCategory } from '../models/ingredient-category.interface';

// provided in 2 modules
@Injectable()
export class CategoryService {
  private readonly categoryList = new BehaviorSubject<IngredientCategory[]>([]);

  constructor(private readonly http: HttpClient) {}

  /**
   * Load IngredientCategory list from server
   * @private
   */
  private fetchCategories(): Observable<IngredientCategory[]> {
    const url = `${environment.SERVER_API}/ingredient/categories`;
    return this.http
      .get<IngredientCategory[]>(url)
      .pipe(tap(this.categoryList.next.bind(this.categoryList)));
  }

  /**
   * Get list of all categories with ingredients
   */
  public loadCategories() {
    return this.categoryList.pipe(
      switchMap((categories) => (categories.length ? this.categoryList : this.fetchCategories()))
    );
  }
}
