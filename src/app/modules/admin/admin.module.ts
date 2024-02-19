import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { DataCollectionService } from './services/data-collection.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [AdminRoutingModule, CommonModule],
  providers: [DataCollectionService],
  exports: [],
})
export class AdminModule {}
