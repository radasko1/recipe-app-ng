import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Language } from '../modules/language-switch/models/language.type';
import { CookieService } from './cookie.service';

const COOKIE_NAME = '_lang';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage: Language = 'en';
  private languageChange = new BehaviorSubject<Language>(this.currentLanguage);

  constructor(private cookieService: CookieService) {
    const cookie = this.cookieService.get(COOKIE_NAME);

    if (cookie) {
      this.currentLanguage = cookie as Language;
    }
  }

  /**
   * Get current language
   */
  get language(): Language {
    return this.currentLanguage;
  }

  /**
   * Change current language
   * @param lang
   */
  change(lang: Language) {
    this.currentLanguage = lang;
    this.cookieService.set(COOKIE_NAME, lang, { path: '/' });
    this.languageChange.next(lang);
  }
}
