import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DataCollectionService {
  constructor(private readonly httpClient: HttpClient) {}

  /** */
  public getListForControl() {
    const url = environment.SERVER_API + '/data-collection/for-control';
    return this.httpClient.get<any[]>(url);
  }
}
