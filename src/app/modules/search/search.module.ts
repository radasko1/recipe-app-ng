import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { RecipeService } from '../../services/recipe.service';
import { CategoryService } from '../../services/category.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
  declarations: [SearchComponent, SearchBarComponent, RecipeComponent, AutocompleteComponent],
  imports: [SearchRoutingModule, CommonModule, ReactiveFormsModule],
  providers: [RecipeService, CategoryService],
  exports: [],
})
export class SearchModule {}
