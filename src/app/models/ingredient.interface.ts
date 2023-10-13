import { Locale } from './locale.interface';

export interface Ingredient {
  name: string;
  locale: Locale;
  selected: boolean;
}
