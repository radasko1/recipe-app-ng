import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

interface Locale {
  [key1: string]: {
    [key2: string]: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  constructor(private readonly langService: LanguageService) {}

  /**
   * Get text from locale file in component template
   * @param localeObject
   * @param localeKey
   */
  public getLocaleValue(localeObject: Locale, localeKey: string) {
    return localeObject[this.langService.language][localeKey];
  }
}
