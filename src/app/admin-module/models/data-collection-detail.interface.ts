import { Ingredient } from "../../search-module/models/ingredient.interface";
import { Localized } from "../../shared/models/localized.type";

export interface DataCollectionDetail {
  title: string;
  url: string;
  calories: string;
  titleLocale: Localized | null;
  ingredients: string[];
  requiredIngredients: Ingredient[];
  optionalIngredients: Ingredient[];
}
