import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HallazgosPage } from './hallazgos.page';
import {ListHallazgoComponent} from './list-hallazgo/list-hallazgo.component'
import { HallazgoDetalleComponent } from './hallazgo-detalle/hallazgo-detalle.component';
import { ScrollUpdateComponent } from '../components/scroll-update/scroll-update.component';
import { NewThingComponent } from '../components/new-thing/new-thing.component';
import { AddInfoHallazgoComponent } from './add-info-hallazgo/add-info-hallazgo.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { EditarComponent } from './hallazgo-detalle/editar/editar.component';
import { EditarComponentModal } from '../modals/editar/editar.component2';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from '../material/material.module';
import { MenuHallazgosComponent } from './menu-hallazgos/menu-hallazgos.component';
import { AreasListHallazgosComponent } from './admi/areas-list-hallazgos/areas-list-hallazgos.component';
import { AddAreaHallazgosComponent } from './admi/areas-list-hallazgos/add-area-hallazgos/add-area-hallazgos.component';
import { SubAreasListHallazgosComponent } from './admi/sub-areas-list-hallazgos/sub-areas-list-hallazgos.component';
import { AddSubAreaHallazgosComponent } from './admi/sub-areas-list-hallazgos/add-sub-area-hallazgos/add-sub-area-hallazgos.component';
import { EventListHallazgosComponent } from './admi/eventos/event-list-hallazgos/event-list-hallazgos.component';
import { AddEventoComponent } from './admi/eventos/event-list-hallazgos/add-evento/add-evento.component';
import { EditEventComponent } from './admi/eventos/event-list-hallazgos/edit-event/edit-event.component';
import { ModalChangeAreaComponent } from '../hallazgo-complete/modal-change-area/modal-change-area.component';
import { EditComponentValorComponent } from './admi/areas-list-hallazgos/edit-component-valor/edit-component-valor.component';

const routes: Routes = [
  {
    path: '',
    component: HallazgosPage,
    children:[{path:'/listHallazgos', component: ListHallazgoComponent}]
  }
];

@NgModule({
  imports: [
    MaterialModule,
    CanvasWhiteboardModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ScrollingModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditarComponentModal,
                 EditarComponent,
                 HallazgosPage,
                 ListHallazgoComponent,
                 HallazgoDetalleComponent,
                 ScrollUpdateComponent,
                 NewThingComponent,
                 AddInfoHallazgoComponent,
                 MenuHallazgosComponent,
                 AreasListHallazgosComponent,
                 AddAreaHallazgosComponent,
                 SubAreasListHallazgosComponent,
                 AddSubAreaHallazgosComponent,
                 EventListHallazgosComponent,
                 AddEventoComponent,
                 EditEventComponent,
                 EditComponentValorComponent
                 ],

  providers:[ScreenOrientation],
  entryComponents:[AddInfoHallazgoComponent,
                   ListHallazgoComponent,
                  EditarComponentModal,
                  EditarComponent,
                  AreasListHallazgosComponent,
                  AddAreaHallazgosComponent,
                  SubAreasListHallazgosComponent,
                  AddSubAreaHallazgosComponent,
                  EventListHallazgosComponent,
                  AddEventoComponent,
                  EditEventComponent,
                  EditComponentValorComponent
                  ]
})
export class HallazgosPageModule {}
