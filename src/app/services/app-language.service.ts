import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../types/language.type';

@Injectable()
export class LanguageService {
  private currentLanguage: Language = 'en';
  private languageChange = new BehaviorSubject<Language>(this.currentLanguage);

  public languageChange$ = this.languageChange.asObservable();

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
    this.languageChange.next(lang);
  }
}
