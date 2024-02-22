import { Ingredient } from '../../search/models/ingredient.interface';

export interface DataCollectionDetail {
  title: string;
  url: string;
  ingredients: string[];
  suggestedIngredients: Ingredient[];
}
