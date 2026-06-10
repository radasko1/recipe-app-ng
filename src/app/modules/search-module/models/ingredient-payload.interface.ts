import { Locale } from './locale.interface';

export interface IngredientPayload {
  name: string;
  locale: Locale | null;
  category_id: number;
}
