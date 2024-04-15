import { Injectable } from '@angular/core';
import { LanguageService } from '../../shared/services/language-service/language.service';

type LocaleFile = {
  // [L in keyof Language]: {
  [LanguageKey: string]: {
    [LocaleTextKey: string]: string;
  };
};

@Injectable()
export class LocaleService {
  constructor(private readonly langService: LanguageService) {}

  /**
   * Get text from locale file in component template
   * @param localeObject
   * @param localeKey
   */
  getLocaleValue(localeObject: LocaleFile, localeKey: string) {
    return localeObject[this.langService.language][localeKey];
  }
}
