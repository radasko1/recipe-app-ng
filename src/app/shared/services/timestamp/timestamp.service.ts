import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimestampService {
  /**
   * Get current timestamp in seconds
   */
  get currentTimestamp(): number {
    return Math.floor(Date.now() / 1000);
  }
}
