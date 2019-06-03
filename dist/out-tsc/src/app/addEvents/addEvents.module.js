import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addEventsPage } from './addEvents.page';
import { InformacionEventoComponent } from '../components/informacion-evento/informacion-evento.component';
import { ListEventosComponent } from '../components/list-eventos/list-eventos.component';
var AddEventsPageModule = /** @class */ (function () {
    function AddEventsPageModule() {
    }
    AddEventsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild([
                    {
                        path: '',
                        component: addEventsPage
                    }
                ])
            ],
            entryComponents: [InformacionEventoComponent],
            declarations: [addEventsPage, InformacionEventoComponent, ListEventosComponent]
        })
    ], AddEventsPageModule);
    return AddEventsPageModule;
}());
export { AddEventsPageModule };
//# sourceMappingURL=addEvents.module.js.map