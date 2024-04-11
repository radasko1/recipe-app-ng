import { Locale } from './locale.interface';
import { Ingredient } from './ingredient.interface';

export interface IngredientCategory {
  id: number;
  name: string;
  locale: Locale;
  ingredients: Ingredient[];
}
