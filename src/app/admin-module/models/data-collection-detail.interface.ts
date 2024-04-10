import { Localized } from "../../shared/models/localized.type";

export interface DataCollectionDetail {
  title: string;
  url: string;
  calories: string;
  cookingTime: string | null;
  titleLocale: Localized | null;
  ingredients: string[];
  requiredIngredients: number[];
  optionalIngredients: number[];
}
