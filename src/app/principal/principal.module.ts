import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PrincipalPage } from './principal.page';
import {AsideFiltroComponent} from './aside-filtro/aside-filtro.component';
import {ListItemsComponent} from './list-items/list-items.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MaxNombrePipe } from '../pipe/max-nombre.pipe';
import { AgmCoreModule } from '@agm/core';


const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
  }
];

@NgModule({
  imports: [
    AgmCoreModule,
    NgxPaginationModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrincipalPage,AsideFiltroComponent,ListItemsComponent,MaxNombrePipe],
  entryComponents: [],
})
export class PrincipalPageModule {}
