import { NgModule } from '@angular/core';
import { AutocompleteComponent } from '../../reusable-component/autocomplete/autocomplete.component';
import { BreadcrumbComponent } from '../../reusable-component/breadcrumb/breadcrumb.component';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { SharedModule } from '../../shared/shared.module';
import { DataCollectionModule } from '../data-collection/data-collection.module';
import { LocalizationModule } from '../localization-module/localization.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardPageComponent } from './components/admin-dashboard-page/admin-dashboard-page.component';
import { CheckboxListComponent } from './components/checkbox-list/checkbox-list.component';
import { CreateFormControlComponent } from './components/create-form-control/create-form-control.component';
import { CreateIngredientComponent } from './components/create-ingredient/create-ingredient.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import {
  RecipeIngredientDialogComponent
} from './components/recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import { RecipeListPageComponent } from './components/recipe-list-page/recipe-list-page.component';
import {
  RecipeLocalizationDialogComponent
} from './components/recipe-localization-dialog/recipe-localization-dialog.component';
import { SourceDetailComponent } from './components/source-detail/source-detail.component';
import { SourceDialogComponent } from './components/source-dialog/source-dialog.component';
import { SourceListPageComponent } from './components/source-list-page/source-list-page.component';
import { SourcePageDialogComponent } from './components/source-page-dialog/source-page-dialog.component';
import { DataCollectionService } from './services/data-collection.service';

@NgModule({
  declarations: [
    AdminDashboardPageComponent,
    RecipeListPageComponent,
    RecipeDetailComponent,
    SourceListPageComponent,
    SourceDetailComponent,
    SourceDialogComponent,
    SourcePageDialogComponent,
    CheckboxListComponent,
    RecipeIngredientDialogComponent,
    CreateFormControlComponent,
    CreateIngredientComponent,
    RecipeLocalizationDialogComponent,
  ],
  imports: [
    SharedModule,
    SharedMaterialModule,
    AdminRoutingModule,
    AutocompleteComponent,
    DataCollectionModule,
    LocalizationModule,
    BreadcrumbComponent,
  ],
  providers: [DataCollectionService],
})
export class AdminModule {}
