import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { InformacionEventoComponent } from '../components/informacion-evento/informacion-evento.component';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { ListEventosComponent } from '../components/list-eventos/list-eventos.component';
import { HallazgosService } from '../shared/hallazgos.service';
var addEventsPage = /** @class */ (function () {
    function addEventsPage(_hallazgo, popoverController, platform, navCtrl, storage, popoverCtrl, alertCtrl, alertController, sqlite) {
        this._hallazgo = _hallazgo;
        this.popoverController = popoverController;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.popoverCtrl = popoverCtrl;
        this.alertCtrl = alertCtrl;
        this.alertController = alertController;
        this.sqlite = sqlite;
        this.items = [];
       
    }
    addEventsPage.prototype.ngOnInit = function () {
    };
    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
    addEventsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('who').then(function (val) {
            _this.whoID = val;
        });
        this.storage.get('where').then(function (val) {
            console.log('Where:' + val);
        });
    };
    addEventsPage.prototype.presentPopover = function (ev) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var popover;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: InformacionEventoComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    addEventsPage.prototype.confirmar_crear_evento = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Inicar evento gemba!',
                            message: '<strong>Se creara un nuevo evento para capturar hallazgos</strong>!!!',
                            buttons: [
                                {
                                    text: 'Cancelar',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Aceptar',
                                    handler: function () {
                                        _this.nuevo_evento();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    addEventsPage.prototype.nuevo_evento = function () {
        var _this = this;
        this._hallazgo.insert_evento(this.whoID).then(function (res) {
            console.log("respuesta promesa" + res);
            _this.lista_eventos.getData();
        });
    };
    addEventsPage.prototype.procesaEvent = function (event) {
        this.noEvents = event;
    };
    tslib_1.__decorate([
        ViewChild(ListEventosComponent),
        tslib_1.__metadata("design:type", ListEventosComponent)
    ], addEventsPage.prototype, "lista_eventos", void 0);
    addEventsPage = tslib_1.__decorate([
        Component({
            selector: 'app-addEvents',
            templateUrl: 'addEvents.page.html',
            styleUrls: ['addEvents.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [HallazgosService,
            PopoverController,
            Platform,
            NavController,
            Storage,
            PopoverController,
            AlertController,
            AlertController,
            SQLite])
    ], addEventsPage);
    return addEventsPage;
}());
export { addEventsPage };
//# sourceMappingURL=addEvents.page.js.map