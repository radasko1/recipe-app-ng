import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.interface';
import { IngredientCategory } from '../models/ingredient-category.interface';

@Injectable()
export class IngredientDialogService {
  /** List of selected Ingredient */
  private selectedIngredientList: Ingredient[] = [];

  /** List of selected Ingredients */
  get selectedList() {
    return this.selectedIngredientList;
  }

  /** Number of selected Ingredients */
  get selectedCount() {
    return this.selectedIngredientList.length;
  }

  /**
   * Switch state of selected Ingredient
   * @param selectedIngredient
   * @param nextState
   * @param categoryList
   */
  toggleIngredientSelection(
    selectedIngredient: Ingredient,
    nextState: boolean,
    categoryList: IngredientCategory[]
  ) {
    selectedIngredient.selected = nextState;

    // re-create new selection list above search-bar
    this.selectedIngredientList = categoryList.reduce((result: Ingredient[], category) => {
      const selected = category.ingredients.filter((ingredient) => ingredient.selected);
      return result.concat(selected); // or [...selectedList, ...selected] for an alternative approach
    }, []);
  }

  /**
   * Search through Ingredient Categories to find selected Ingredient item.
   * @param selectedIngredient
   * @param categoryList
   */
  ingredientSelect(selectedIngredient: Ingredient, categoryList: IngredientCategory[]) {
    // TODO i dont like the way of nested documents, there must be a way for better solution
    for (const category of categoryList) {
      for (const ingredient of category.ingredients) {
        if (ingredient.id === selectedIngredient.id) {
          // change state to single item
          this.toggleIngredientSelection(ingredient, true, categoryList);
          break; // Exit the function after changing state
        }
      }
    }
  }
}
