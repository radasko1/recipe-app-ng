import { Locale } from './locale.interface';

export interface Ingredient {
  id: number;
  name: string;
  locale: Locale;
  selected: boolean;
}
