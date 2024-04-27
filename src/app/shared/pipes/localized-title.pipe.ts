import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../../localization-module/models/language.type';
import { Localized } from '../models/localized.type';

// TODO is shared?
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
    // fallback when localized value not exist
    if (!localizedTitle) {
      return title;
    }
    // if there's any value in locale
    const _title = localizedTitle[language].trim();
    return _title.length ? _title : title;
  }
}
