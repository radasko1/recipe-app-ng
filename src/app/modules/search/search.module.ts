import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { AutocompleteModule } from '../../component-modules/autocomplete/autocomplete.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientModalComponent } from './components/ingredient-modal/ingredient-modal.component';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
import { IngredientService } from './services/ingredient.service';
import { IngredientDialogService } from './services/ingredient-dialog.service';

@NgModule({
  declarations: [SearchComponent, SearchBarComponent, RecipeComponent, IngredientModalComponent],
  imports: [
    SearchRoutingModule,
    AutocompleteModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [RecipeService, CategoryService, IngredientService, IngredientDialogService],
  exports: [],
})
export class SearchModule {}
