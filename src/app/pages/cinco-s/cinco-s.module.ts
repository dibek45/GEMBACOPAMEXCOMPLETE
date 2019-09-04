import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CincoSPage } from './cinco-s.page';
import { PopoverComponent } from 'src/app/components/popover/popover/popover.component';
import { DetalleCapturaComponent } from './detalle-captura/detalle-captura.component';
import { ZonaAuditadaComponent } from './zona-auditada/zona-auditada.component';
import { TipoAuditoriaPipe } from 'src/app/pipe/tipo-auditoria.pipe';
import { MaterialModule } from '../../material/material.module';
import { Menu5sadmiComponent } from './menu5sadmi/menu5sadmi.component';
import { AreasListComponent } from './areas-list/areas-list.component';
import { AddAreaComponent } from './areas-list/add-area/add-area.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { SubAreasListComponent } from './areas-list/sub-areas-list/sub-areas-list.component';
import { AddSubareaComponent } from './areas-list/sub-areas-list/add-subarea/add-subarea.component';
import { ModalCompleteComponent } from './modal-complete/modal-complete.component';


const routes: Routes = [
  {
    path: '',
    component: CincoSPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  declarations: [ModalCompleteComponent,AddSubareaComponent,AddAreaComponent,CincoSPage,PopoverComponent,DetalleCapturaComponent,ZonaAuditadaComponent,
 //   Preguntas5sComponent,
    TipoAuditoriaPipe,
  //  CabeceraComponent,QuestionsOpenComponent,QuestionsClosedComponent,EvidenciaComponent
    Menu5sadmiComponent,AreasListComponent,SubAreasListComponent],
  entryComponents:[ModalCompleteComponent,AddSubareaComponent,AddAreaComponent,PopoverComponent,DetalleCapturaComponent,ZonaAuditadaComponent,
 //   Preguntas5sComponent,
 //  CabeceraComponent,QuestionsOpenComponent,QuestionsClosedComponent,EvidenciaComponent,
    Menu5sadmiComponent,SubAreasListComponent],
})
export class CincoSPageModule {}
