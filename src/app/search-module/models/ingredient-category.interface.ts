import { Locale } from './locale.interface';
import { Ingredient } from './ingredient.interface';

export interface IngredientCategory {
  name: string;
  locale: Locale;
  ingredients: Ingredient[];
}
