import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { AdminRoutingModule } from './admin-routing.module';
import { AutocompleteModule } from "../component-modules/autocomplete/autocomplete.module";
import { DashboardComponent } from './components/dashboard.component';
import { DetailComponent } from './components/detail.component';
import { DataCollectionService } from './services/data-collection.service';

@NgModule({
  declarations: [DashboardComponent, DetailComponent],
  imports: [MatCheckboxModule, MatIconModule, AdminRoutingModule, CommonModule, AutocompleteModule],
  providers: [DataCollectionService],
  exports: [],
})
export class AdminModule {}