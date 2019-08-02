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







const routes: Routes = [
  {
    path: '',
    component: HallazgosPage,
    children:[{path:'/listHallazgos', component:ListHallazgoComponent}]
  }
];

@NgModule({
  imports: [
    CanvasWhiteboardModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ScrollingModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditarComponentModal,EditarComponent,HallazgosPage,ListHallazgoComponent,HallazgoDetalleComponent,ScrollUpdateComponent,NewThingComponent,AddInfoHallazgoComponent],
  providers:[ScreenOrientation],
  entryComponents:[ListHallazgoComponent,EditarComponentModal,EditarComponent]
})
export class HallazgosPageModule {}
