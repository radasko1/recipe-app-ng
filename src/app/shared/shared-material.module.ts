import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [MatIconModule, MatPaginatorModule],
  exports: [MatIconModule, MatPaginatorModule],
})
export class SharedMaterialModule {}
