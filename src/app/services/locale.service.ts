import { Injectable } from '@angular/core';

interface Locale {
  [key1: string]: {
    [key2: string]: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  /**
   * Get text from locale file in component template
   * @param localeObject
   * @param key1
   * @param key2
   */
  public getLocaleValue(localeObject: Locale, key1: string, key2: string) {
    return localeObject[key1][key2];
  }
}
