import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { IonicModule } from '@ionic/angular';

import { HallazgoCompletePage } from './hallazgo-complete.page';
import { AvanceComponent } from './avance/avance.component';

const routes: Routes = [
  {
    path: '',
    component: HallazgoCompletePage
  }
];

@NgModule({
  imports: [

    
    NgxImageGalleryModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HallazgoCompletePage,AvanceComponent],
  entryComponents:[]
})
export class HallazgoCompletePageModule {}
