import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { DataCollectionService } from './services/data-collection.service';
import { DetailComponent } from './components/detail.component';

@NgModule({
  declarations: [DashboardComponent, DetailComponent],
  imports: [AdminRoutingModule, CommonModule],
  providers: [DataCollectionService],
  exports: [],
})
export class AdminModule {}
