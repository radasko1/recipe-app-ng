import { IngredientPayload } from './ingredient-payload.interface';

export interface Ingredient extends IngredientPayload {
  id: number;
  selected: boolean;
}
