import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private readonly snackbar: MatSnackBar) {}

  /**
   * Show simple message with snackbar
   * @param text
   */
  showSimpleMessage(text: string) {
    this.snackbar.open(text, undefined, {
      duration: 2000,
    });
  }
}
