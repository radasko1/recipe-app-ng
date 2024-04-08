import { Language } from './language.type';

type LanguageValue = {
  [key: string]: string;
};
/**
 * Type of language objects used inside component to define easy localization texts.
 */
export type LanguageObject = Record<Language, LanguageValue>;
