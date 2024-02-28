import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Ingredient } from '../models/ingredient.interface';

@Injectable()
export class IngredientService {
  constructor(private readonly http: HttpClient) {}

  /** Get list of Ingredient */
  getList() {
    const url = environment.SERVER_API + '/ingredient';
    return this.http.get<Ingredient[]>(url);
  }
}
