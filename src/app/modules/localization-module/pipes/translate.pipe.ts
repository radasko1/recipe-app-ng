import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../models/language.type';
import { LocaleFileKey } from '../models/locale-file-key.type';

@Pipe({
  name: 'translate',
  pure: true,
})
export class TranslatePipe implements PipeTransform {
  transform(localeObject: LocaleFileKey, translationKey: string, language: Language): string {
    if (!localeObject) {
      return 'LOCALE_MISSING';
    }
    return localeObject[language][translationKey];
  }
}
