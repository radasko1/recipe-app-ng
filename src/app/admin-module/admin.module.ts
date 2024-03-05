import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedMaterialModule } from '../shared/shared-material.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AutocompleteModule } from '../component-modules/autocomplete/autocomplete.module';
import { DashboardComponent } from './components/dashboard.component';
import { RecipeDetailBreadcrumbComponent } from './components/recipe-detail-breadcrumb.component';
import { RecipeDetailComponent } from './components/recipe-detail.component';
import { DataCollectionService } from './services/data-collection.service';

@NgModule({
  declarations: [DashboardComponent, RecipeDetailComponent, RecipeDetailBreadcrumbComponent],
  imports: [
    MatCheckboxModule,
    SharedMaterialModule,
    AdminRoutingModule,
    CommonModule,
    AutocompleteModule,
  ],
  providers: [DataCollectionService],
  exports: [],
})
export class AdminModule {}
