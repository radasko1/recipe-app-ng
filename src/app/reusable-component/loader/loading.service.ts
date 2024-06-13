import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly isLoading = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoading.asObservable();

  /** Start loading */
  start() {
    this.isLoading.next(true);
  }

  /** Stop loading */
  stop() {
    this.isLoading.next(false);
  }
}
