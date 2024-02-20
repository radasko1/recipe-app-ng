import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, mergeMap, single, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { DataCollection } from '../models/data-collection.interface';

@Injectable()
export class DataCollectionService {
  private readonly subject = new BehaviorSubject<DataCollection[]>([]);

  constructor(private readonly httpClient: HttpClient) {
    this.getData().subscribe();
  }

  /** Fetch data from server and save them for other requests */
  private getData() {
    const url = environment.SERVER_API + '/data-collection/for-control';
    return this.httpClient.get<DataCollection[]>(url).pipe(tap((data) => this.subject.next(data)));
  }

  /** */
  public getDataCollectionList() {
    return this.subject;
  }

  /** */
  public getDataCollectionItem(id: number) {
    return this.subject.pipe(
      mergeMap((item) => item),
      filter((value) => value.id === id)
    );
  }
}
