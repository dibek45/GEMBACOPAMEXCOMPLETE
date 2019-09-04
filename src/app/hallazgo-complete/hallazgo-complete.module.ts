import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { IonicModule } from '@ionic/angular';

import { HallazgoCompletePage } from './hallazgo-complete.page';
import { AvanceComponent } from './avance/avance.component';
import { ComentarioComponent } from './comentario/comentario.component';
import { FichaHallazgoComponent } from './ficha-hallazgo/ficha-hallazgo.component';
import { ImagenModalPage } from '../imagen-modal/imagen-modal.page';
import { MaterialModule } from '../material/material.module';
import { ModalChangeAreaComponent } from './modal-change-area/modal-change-area.component';


const routes: Routes = [
  {
    path: '',
    component: HallazgoCompletePage
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule ,
    MaterialModule,
    NgxImageGalleryModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HallazgoCompletePage,AvanceComponent,ComentarioComponent,FichaHallazgoComponent,ImagenModalPage,ModalChangeAreaComponent],
  entryComponents:[ImagenModalPage,ModalChangeAreaComponent]
})
export class HallazgoCompletePageModule {}
