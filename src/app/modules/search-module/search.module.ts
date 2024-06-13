import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AutocompleteComponent } from '../../reusable-component/autocomplete/autocomplete.component';
import { LoaderComponent } from '../../reusable-component/loader/loader.component';
import { SharedModule } from '../../shared/shared.module';
import { LocalizationModule } from '../localization-module/localization.module';
import { IngredientModalComponent } from './components/ingredient-modal/ingredient-modal.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchRoutingModule } from './search-routing.module';
import { CategoryService } from './services/category.service';
import { IngredientDialogService } from './services/ingredient-dialog.service';
import { RecipeLoaderService } from './services/recipe-loader.service';
import { RecipeService } from './services/recipe.service';

@NgModule({
  declarations: [
    SearchPageComponent,
    SearchBarComponent,
    RecipeComponent,
    IngredientModalComponent,
  ],
  imports: [
    SearchRoutingModule,
    AutocompleteComponent,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    SharedModule,
    LocalizationModule,
    LoaderComponent,
  ],
  providers: [RecipeService, CategoryService, IngredientDialogService, RecipeLoaderService],
})
export class SearchModule {}
