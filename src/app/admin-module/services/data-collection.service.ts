import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Localized } from '../../shared/models/localized.type';

import { DataCollectionSourceForm } from '../models/data-collection-source-form.model';
import { DataCollectionSource } from '../models/data-collection-source.interface';
import { DataCollection } from '../models/data-collection.interface';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class DataCollectionService {
  private readonly url = environment.SERVER_API + '/data-collection';

  constructor(private readonly httpClient: HttpClient) {}

  /** */
  public getDataCollectionPageList() {
    const url = this.url + '/page/for-analyze';
    return this.httpClient.get<DataCollection[]>(url);
  }

  /** */
  public getDataCollectionPageDetail(id: number) {
    const url = this.url + '/page/detail/' + id;
    return this.httpClient.get<DataCollectionDetail>(url);
  }

  /** */
  public getDataCollectionSource() {
    const url = this.url + '/source/list';
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
   * Create new source
   * @param formData
   */
  public addSource(formData: DataCollectionSourceForm) {
    const url = this.url + '/source/create';
    return this.httpClient.post(url, formData);
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

  /**
   * Update DataCollectionPage localized title
   * @param id
   * @param locale
   */
  public updatePageTitleLocale(id: number, locale: Localized) {
    const url = this.url + '/update/page-title-locale';
    return this.httpClient.patch(url, { id, locale });
  }
}
