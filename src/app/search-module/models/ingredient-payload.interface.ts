import { Locale } from './locale.interface';

export interface IngredientPayload {
  name: string;
  locale: Locale;
  category_id: number;
}
