import { Locale } from './locale.interface';
import { Ingredient } from './ingredient.interface';
import { FormIngredient } from "./form-ingredient.interface";

export interface IngredientCategory {
  name: string;
  locale: Locale;
  ingredientCategoryRels: Ingredient[];
  ingredients: FormIngredient[];
}
