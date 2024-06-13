import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RecipeLoaderService {
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly loading$: Observable<boolean> = this.loading.asObservable();

  start() {
    this.loading.next(true);
  }

  stop() {
    this.loading.next(false);
  }
}
