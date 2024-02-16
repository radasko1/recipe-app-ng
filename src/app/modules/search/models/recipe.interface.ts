import { Locale } from './locale.interface';
import { Ingredient } from './ingredient.interface';

export interface Recipe {
  name: string;
  link: string;
  calories: number;
  locale: Locale;
  image_url: string | null;
  requiredIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
}
