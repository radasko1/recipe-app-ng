import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AutocompleteModule } from '../component-modules/autocomplete/autocomplete.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CreateFormControlComponent } from './components/create-form-control/create-form-control.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckboxListComponent } from './components/checkbox-list/checkbox-list.component';
import { RecipeIngredientDialogComponent } from './components/recipe-ingredient-dialog/recipe-ingredient-dialog.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { DataCollectionModule } from '../data-collection/data-collection.module';
import { SourceDetailComponent } from './components/source-detail/source-detail.component';
import { SourceDialogComponent } from './components/source-dialog/source-dialog.component';
import { SourceListComponent } from './components/source-list/source-list.component';
import { SourcePageDialogComponent } from './components/source-page-dialog/source-page-dialog.component';
import { DataCollectionService } from './services/data-collection.service';
import { SharedMaterialModule } from '../shared/shared-material.module';

@NgModule({
  declarations: [
    DashboardComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    SourceListComponent,
    SourceDetailComponent,
    SourceDialogComponent,
    SourcePageDialogComponent,
    BreadcrumbComponent,
    CheckboxListComponent,
    RecipeIngredientDialogComponent,
    CreateFormControlComponent,
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
