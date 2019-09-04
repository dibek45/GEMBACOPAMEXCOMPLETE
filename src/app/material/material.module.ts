import { NgModule } from "@angular/core";
import {MatDialogModule } from '@angular/material/dialog';

import {
  MatMenuModule,
  MatToolbarModule,
  MatTableModule,
  MatStepperModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatSortModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatExpansionModule
  
} from "@angular/material";
 
@NgModule({
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatExpansionModule
  ]
})
export class MaterialModule {}