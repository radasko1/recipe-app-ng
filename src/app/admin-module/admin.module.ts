import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AutocompleteModule } from '../component-modules/autocomplete/autocomplete.module';
import { BreadcrumbComponent } from './components/breadcrumb.component';
import { DashboardComponent } from './components/dashboard.component';
import { RecipeDetailCheckboxListComponent } from "./components/recipe-detail-checkbox-list.component";
import { RecipeListComponent } from './components/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-detail.component';
import { RecipeTitleDialogComponent } from './components/recipe-title-dialog.component';
import { SourceDetailComponent } from './components/source-detail.component';
import { SourceDialogComponent } from './components/source-dialog.component';
import { SourceListComponent } from './components/source-list.component';
import { SourcePageDialogComponent } from './components/source-page-dialog.component';
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
    RecipeTitleDialogComponent,
    RecipeDetailCheckboxListComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedMaterialModule,
    AdminRoutingModule,
    CommonModule,
    AutocompleteModule,
    SharedModule,
  ],
  providers: [DataCollectionService],
})
export class AdminModule {}
