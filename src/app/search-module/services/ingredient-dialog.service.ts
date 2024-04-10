import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.interface';
import { IngredientCategory } from '../models/ingredient-category.interface';
import { CategoryService } from './category.service';

@Injectable()
export class IngredientDialogService {
  private categoryList: IngredientCategory[] = [];
  /** List of selected Ingredient */
  private selectedIngredientList: Ingredient[] = [];

  constructor(private readonly categoryService: CategoryService) {
    // Get ingredient categories - memory leak?
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categoryList = data;
      },
    });
  }

  /**
   * Function to find the category containing the ingredient
   * @param ingredient
   */
  private findCategory(ingredient: Ingredient) {
    const categoryID = ingredient.category_id;
    return this.categoryList.find((cat) => cat.id === categoryID);
  }

  private findIngredient(selectedIngredient: Ingredient, category: IngredientCategory) {
    const ingredientList = category.ingredients;
    return ingredientList.find((ing) => ing.id === selectedIngredient.id);
  }

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
   */
  toggleIngredientSelection(selectedIngredient: Ingredient, nextState: boolean) {
    selectedIngredient.selected = nextState;
    // re-create new selection list above search-bar
    this.selectedIngredientList = this.categoryList.reduce((result: Ingredient[], category) => {
      const selected = category.ingredients.filter((ingredient) => ingredient.selected);
      return result.concat(selected); // or [...selectedList, ...selected] for an alternative approach
    }, []);
  }

  /**
   * Search through Ingredient Categories to find selected Ingredient item.
   * @param selectedIngredient
   */
  ingredientSelect(selectedIngredient: Ingredient) {
    const foundCategory = this.findCategory(selectedIngredient);
    if (!foundCategory) {
      return;
    }
    const foundIngredient = this.findIngredient(selectedIngredient, foundCategory);
    if (!foundIngredient) {
      return;
    }
    this.toggleIngredientSelection(foundIngredient, true);
  }
}
