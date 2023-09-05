import { Injectable } from '@angular/core';
import { Language } from './types/language.type';

@Injectable()
export class LanguageService {
  private currentLanguage: Language = 'en';

  /**
   * Get current language
   */
  get language(): Language {
    return this.currentLanguage;
  }

  /**
   * Set current language
   * @param lang
   */
  set language(lang: Language) {
    this.currentLanguage = lang;
  }
}
