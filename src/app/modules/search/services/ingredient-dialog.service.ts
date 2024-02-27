import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.interface';
import { IngredientCategory } from '../models/ingredient-category.interface';

@Injectable()
export class IngredientDialogService {
  /** List of selected Ingredient */
  private selectedIngredientList: Ingredient[] = [];

  constructor() {}

  /** List of selected Ingredients */
  get selectedList() {
    return this.selectedIngredientList;
  }

  toggleIngredientSelection(
    ingredient: Ingredient,
    nextState: boolean,
    categoryList: IngredientCategory[]
  ) {
    ingredient.selected = nextState;

    // re-create new selection list above search-bar
    this.selectedIngredientList = categoryList.reduce((result: Ingredient[], category) => {
      const selected = category.ingredientCategoryRels.filter((ingredient) => ingredient.selected);
      return result.concat(selected); // or [...selectedList, ...selected] for an alternative approach
    }, []);
  }
}
