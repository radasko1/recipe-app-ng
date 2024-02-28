import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

import { DataCollection } from '../models/data-collection.interface';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';

@Injectable()
export class DataCollectionService {
  constructor(private readonly httpClient: HttpClient) {}

  /** */
  public getDataCollectionList() {
    const url = environment.SERVER_API + '/data-collection/list/analyzed-pages';
    return this.httpClient.get<DataCollection[]>(url);
  }

  /** */
  public getDataCollectionDetail(id: number) {
    const url = environment.SERVER_API + '/data-collection/detail/' + id;
    return this.httpClient.get<DataCollectionDetail>(url);
  }

  /**
   * Update list of Ingredients in Recipe
   * @param id
   * @param requiredIngredients
   * @param optionalIngredients
   */
  public saveDataCollectionIngredients(
    id: number,
    requiredIngredients: number[],
    optionalIngredients: number[]
  ) {
    const url = environment.SERVER_API + '/data-collection/update/recipe-ingredients';
    return this.httpClient.patch(url, {
      id,
      requiredIngredients,
      optionalIngredients,
    });
  }

  /** */
  public deletePageData(id: number) {
    const url = environment.SERVER_API + '/data-collection/delete-data';
    return this.httpClient.post(url, { id });
  }

  /** */
  public approvePageData(id: number) {
    const url = environment.SERVER_API + '/data-collection/approve-data';
    return this.httpClient.post(url, { id });
  }
}
