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


const routes: Routes = [
  {
    path: '',
    component: HallazgosPage,
    children:[{path:'/listHallazgos', component:ListHallazgoComponent}]
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HallazgosPage,ListHallazgoComponent,HallazgoDetalleComponent,ScrollUpdateComponent,NewThingComponent,AddInfoHallazgoComponent],
  entryComponents:[ListHallazgoComponent]
})
export class HallazgosPageModule {}
