import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Localized } from '../../../shared/models/localized.type';
import { DataCollectionSourceForm } from '../models/data-collection-source-form.model';
import { DataCollectionSource } from '../models/data-collection-source.interface';
import { DataCollection } from '../models/data-collection.interface';
import { DataCollectionDetail } from '../models/data-collection-detail.interface';

@Injectable()
export class DataCollectionService {
  private readonly pageUrl = environment.SERVER_API + '/data-collection-page';
  private readonly sourceUrl = environment.SERVER_API + '/data-collection-source';

  constructor(private readonly httpClient: HttpClient) {}

  /** */
  public getDataCollectionPageList() {
    const url = this.pageUrl + '/for-analyze';
    return this.httpClient.get<DataCollection[]>(url);
  }

  /** */
  public getDataCollectionPageDetail(id: number) {
    const url = this.pageUrl + '/detail/' + id;
    return this.httpClient.get<DataCollectionDetail>(url);
  }

  /** */
  public getDataCollectionSource() {
    const url = this.sourceUrl + '/list';
    return this.httpClient.get<DataCollectionSource[]>(url);
  }

  /** */
  public getDataCollectionSourceDetail(id: number) {
    const url = this.sourceUrl + '/detail/' + id;
    return this.httpClient.get<DataCollectionSource>(url);
  }

  /**
   *
   * @param id
   * @param data
   */
  public updatePageData(id: number, data: string) {
    const url = this.pageUrl + '/page-data';
    return this.httpClient.put(url, { id, data });
  }

  /** */
  public deletePageData(id: number) {
    const url = this.pageUrl + '/delete-data';
    return this.httpClient.post(url, { id });
  }

  /** */
  public approvePageData(id: number) {
    const url = this.pageUrl + '/approve-data';
    return this.httpClient.post(url, { id });
  }

  /**
   * Add new page with recipe to the source
   * @param id
   * @param link
   */
  public addSourceLink(id: number, link: string) {
    const url = this.pageUrl + '/add-link';
    return this.httpClient.post(url, { id, link });
  }

  /**
   * Create new source
   * @param formData
   */
  public addSource(formData: DataCollectionSourceForm) {
    const url = this.sourceUrl + '/create';
    return this.httpClient.post(url, formData);
  }

  /**
   * Save updated data of DataSource
   * @param id
   * @param source
   */
  public updateDataSource(id: number, source: DataCollectionSource) {
    const url = this.sourceUrl + '/data-source';
    return this.httpClient.patch<DataCollectionSource>(url, { id, config: source });
  }

  /**
   * Update DataCollectionPage localized title
   * @param id
   * @param title
   * @param locale
   */
  public updatePageTitleLocale(id: number, title: string, locale: Localized) {
    const url = this.pageUrl + '/page-title-locale';
    return this.httpClient.patch(url, { id, title, locale });
  }
}
