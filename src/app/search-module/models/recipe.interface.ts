import { Locale } from './locale.interface';
import { Ingredient } from './ingredient.interface';

export interface Recipe {
  name: string;
  link: string;
  calories: number | null;
  preparation_time: number | null;
  locale: Locale;
  image_url: string | null;
  requiredIngredients: Ingredient[];
  optionalIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
}
