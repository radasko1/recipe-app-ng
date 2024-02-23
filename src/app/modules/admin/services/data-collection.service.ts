import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
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
  // public getDataCollectionItem(id: number) {
  //   return this.subject.pipe(
  //     mergeMap((item) => item),
  //     filter((value) => value.id === id)
  //   );
  // }

  /** */
  public getDataCollectionDetail(id: number) {
    const url = environment.SERVER_API + '/data-collection/detail/' + id;
    return this.httpClient.get<DataCollectionDetail>(url);
  }

  /** */
  public saveDataCollectionIngredients(id: number, idCollection: number[]) {
    const url = environment.SERVER_API + '/data-collection/update/recipe-ingredients';
    return this.httpClient.patch(url, { id: id, idList: idCollection });
  }

  /** */
  public deletePageData(id: number) {
    const url = environment.SERVER_API + '/data-collection/delete-data/';
    return this.httpClient.post(url, { id });
  }
}
