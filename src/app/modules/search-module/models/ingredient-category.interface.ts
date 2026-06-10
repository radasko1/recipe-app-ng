import { Locale } from './locale.interface';
import { Ingredient } from './ingredient.interface';

export interface IngredientCategory {
  id: string;
  name: string;
  locale: Locale | null;
  ingredients: Ingredient[];
}
