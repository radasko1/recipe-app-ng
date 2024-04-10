import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IngredientCategory } from '../models/ingredient-category.interface';

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
   * Get list of all categories with ingredients
   */
  public getCategories(): Observable<IngredientCategory[]> {
    return this.subject;
  }
}
