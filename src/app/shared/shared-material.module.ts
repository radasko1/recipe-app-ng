import { NgModule } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatDialogModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
  ],
  exports: [
    MatDialogModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
  ],
})
// TODO be aware where to use it, yo don't need all packages
export class SharedMaterialModule {}
