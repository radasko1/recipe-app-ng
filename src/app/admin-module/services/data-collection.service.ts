import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataCollectionSource } from '../models/data-collection-source.interface';

import { DataCollection } from '../models/data-collection.interface';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';

@Injectable()
export class DataCollectionService {
  private readonly url = environment.SERVER_API + '/data-collection';

  constructor(private readonly httpClient: HttpClient) {}

  /** */
  public getDataCollectionPageList() {
    const url = this.url + '/list/analyzed-pages';
    return this.httpClient.get<DataCollection[]>(url);
  }

  /** */
  public getDataCollectionPageDetail(id: number) {
    const url = this.url + '/page/detail/' + id;
    return this.httpClient.get<DataCollectionDetail>(url);
  }

  /** */
  public getDataCollectionSource() {
    const url = this.url + '/list/sources';
    return this.httpClient.get<DataCollectionSource[]>(url);
  }

  /** */
  public getDataCollectionSourceDetail(id: number) {
    const url = this.url + '/source/detail/' + id;
    return this.httpClient.get<DataCollectionSource>(url);
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
    const url = this.url + '/update/recipe-ingredients';
    return this.httpClient.patch(url, {
      id,
      requiredIngredients,
      optionalIngredients,
    });
  }

  /** */
  public deletePageData(id: number) {
    const url = this.url + '/delete-data';
    return this.httpClient.post(url, { id });
  }

  /** */
  public approvePageData(id: number) {
    const url = this.url + '/approve-data';
    return this.httpClient.post(url, { id });
  }

  /**
   * Add new page with recipe to the source
   * @param id
   * @param link
   */
  public addSourceLink(id: number, link: string) {
    const url = this.url + '/source/add-link';
    return this.httpClient.post(url, { id, link });
  }

  /**
   * Save updated data of DataSource
   * @param id
   * @param source
   */
  public updateDataSource(id: number, source: DataCollectionSource) {
    const url = this.url + '/update/data-source';
    return this.httpClient.patch<DataCollectionSource>(url, { id, config: source });
  }
}
