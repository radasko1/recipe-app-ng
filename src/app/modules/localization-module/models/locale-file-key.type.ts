import { Language } from './language.type';

interface LocaleTranslationKey {
  [key: string]: string;
}
/**
 * Type of language objects used inside component to define easy localization texts.
 */
export type LocaleFileKey = Record<Language, LocaleTranslationKey>;
