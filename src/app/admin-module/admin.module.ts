import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AutocompleteModule } from '../component-modules/autocomplete/autocomplete.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CreateFormControlComponent } from './components/create-form-control/create-form-control.component';
import { AdminDashboardPageComponent } from './components/admin-dashboard-page/admin-dashboard-page.component';
import { CheckboxListComponent } from './components/checkbox-list/checkbox-list.component';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { RecipeIngredientDialogComponent } from './components/recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import { RecipeListPageComponent } from './components/recipe-list-page/recipe-list-page.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { DataCollectionModule } from '../data-collection/data-collection.module';
import { SourceDetailComponent } from './components/source-detail/source-detail.component';
import { SourceDialogComponent } from './components/source-dialog/source-dialog.component';
import { SourceListPageComponent } from './components/source-list-page/source-list-page.component';
import { SourcePageDialogComponent } from './components/source-page-dialog/source-page-dialog.component';
import { DataCollectionService } from './services/data-collection.service';
import { SharedMaterialModule } from '../shared/shared-material.module';

@NgModule({
  declarations: [
    AdminDashboardPageComponent,
    RecipeListPageComponent,
    RecipeDetailComponent,
    SourceListPageComponent,
    SourceDetailComponent,
    SourceDialogComponent,
    SourcePageDialogComponent,
    BreadcrumbComponent,
    CheckboxListComponent,
    RecipeIngredientDialogComponent,
    CreateFormControlComponent,
    CreateIngredientComponent,
  ],
  imports: [
    SharedModule,
    SharedMaterialModule,
    AdminRoutingModule,
    AutocompleteModule,
    DataCollectionModule,
  ],
  providers: [DataCollectionService],
})
export class AdminModule {}
