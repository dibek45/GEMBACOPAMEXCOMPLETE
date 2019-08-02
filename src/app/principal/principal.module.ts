import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { PrincipalPage } from './principal.page';
import {AsideFiltroComponent} from './aside-filtro/aside-filtro.component';
import {ListItemsComponent} from './list-items/list-items.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MaxNombrePipe } from '../pipe/max-nombre.pipe';
import { AgmCoreModule } from '@agm/core';
import { AngularCollapseModule } from 'angular-collapse';
import { ReactiveFormsModule} from '@angular/forms';
import { MaxDescripcionPipe } from '../pipe/max-descripcion.pipe';



const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
  }
];

@NgModule({
  imports: [
    AngularCollapseModule,
    AgmCoreModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [PrincipalPage,AsideFiltroComponent,ListItemsComponent,MaxNombrePipe,MaxDescripcionPipe],
  entryComponents: [],
})
export class PrincipalPageModule {}
