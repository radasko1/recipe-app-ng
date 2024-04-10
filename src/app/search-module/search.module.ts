import { NgModule } from '@angular/core';

import { AutocompleteModule } from '../component-modules/autocomplete/autocomplete.module';
import { SharedMaterialModule } from '../shared/shared-material.module';
import { SharedModule } from '../shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientModalComponent } from './components/ingredient-modal/ingredient-modal.component';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
import { IngredientDialogService } from './services/ingredient-dialog.service';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchBarComponent,
    RecipeComponent,
    IngredientModalComponent,
  ],
  imports: [SearchRoutingModule, AutocompleteModule, SharedMaterialModule, SharedModule],
  providers: [RecipeService, CategoryService, IngredientDialogService],
})
export class SearchModule {}
