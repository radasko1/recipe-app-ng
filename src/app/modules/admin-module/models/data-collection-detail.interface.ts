import { Localized } from '../../../shared/models/localized.type';

export interface DataCollectionDetail {
  title: string;
  url: string;
  calories: number; // kcal
  image: string | null;
  cookingTime: number | null; // minutes
  titleLocale: Localized | null;
  ingredients: string[];
  requiredIngredients: number[];
  optionalIngredients: number[];
}
