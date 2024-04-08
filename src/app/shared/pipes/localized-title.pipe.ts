import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../../language-switch-module/models/language.type';
import { Localized } from '../models/localized.type';

@Pipe({
  name: 'localizedTitle',
  pure: true,
})
/**
 * Show localized title based on current selected language.
 * Otherwise has fallback for name/title value when localized value not found.
 *
 * @example
 * {{ item.localeName | localizedTitle: currentLanguage: item.title }}
 */
export class LocalizedTitlePipe implements PipeTransform {
  transform(localizedTitle: Localized | null, language: Language, title: string): string {
    // if there's any value in locale
    if (localizedTitle && localizedTitle[language].trim().length) {
      return localizedTitle[language].trim();
    }
    return title;
  }
}
