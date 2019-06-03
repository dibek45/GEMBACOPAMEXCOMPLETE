import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HallazgosPage } from './hallazgos.page';
import { ListHallazgoComponent } from './list-hallazgo/list-hallazgo.component';
import { HallazgoDetalleComponent } from './hallazgo-detalle/hallazgo-detalle.component';
var routes = [
    {
        path: '',
        component: HallazgosPage,
        children: [{ path: '/listHallazgos', component: ListHallazgoComponent }]
    }
];
var HallazgosPageModule = /** @class */ (function () {
    function HallazgosPageModule() {
    }
    HallazgosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HallazgosPage, ListHallazgoComponent, HallazgoDetalleComponent],
            entryComponents: [ListHallazgoComponent]
        })
    ], HallazgosPageModule);
    return HallazgosPageModule;
}());
export { HallazgosPageModule };
//# sourceMappingURL=hallazgos.module.js.map