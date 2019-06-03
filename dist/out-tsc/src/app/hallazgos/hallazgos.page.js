import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
var HallazgosPage = /** @class */ (function () {
    function HallazgosPage(router, route, platform, alertController) {
        this.router = router;
        this.route = route;
        this.platform = platform;
        this.alertController = alertController;
        this.platform.backButton.subscribe(function () {
            alert("se preciona el boton back");
        });
        this.platform.backButton.subscribeWithPriority(0, function () {
            alert("se preciona el boton back sin saber que hacer");
        });
    }
    HallazgosPage.prototype.ngOnInit = function () {
        this.id_evento = parseInt(this.route.snapshot.paramMap.get('id'));
        alert(this.id_evento);
        this.show = "lista";
        this.presentAlertPromptDescription();
    };
    HallazgosPage.prototype.presentAlertPromptDescription = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Datos del hallazgo',
                            inputs: [
                                {
                                    name: 'Descripcion',
                                    type: 'text',
                                    placeholder: 'Descripcion'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function () {
                                        console.log('Confirm Ok');
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
    HallazgosPage.prototype.new_data = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Descripción del hallazgo',
            message: "Problema encontrado",
            inputs: [
                {
                    name: 'descripcion',
                    placeholder: ''
                },
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Guardar',
                    handler: function (data) {
                        _this.arreglo.descripcion = data.descripcion;
                        // this.nuevo_evento(data.descripcion);
                        if (data.descripcion != "") {
                            _this.tipo_evento();
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    HallazgosPage.prototype.tipo_evento = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Especificar la razón',
            inputs: [
                {
                    type: 'radio',
                    label: '1ra Selección',
                    value: '1'
                },
                {
                    type: 'radio',
                    label: '2da Orden',
                    value: '2'
                },
                {
                    type: 'radio',
                    label: '3ra Limpieza',
                    value: '3'
                },
                {
                    type: 'radio',
                    label: 'Mejora',
                    value: '4'
                },
                {
                    type: 'radio',
                    label: 'Reparación',
                    value: '5'
                },
                {
                    type: 'radio',
                    label: 'Seguridad',
                    value: '6'
                },
                {
                    type: 'radio',
                    label: '4a Estandarización',
                    value: '7'
                },
                {
                    type: 'radio',
                    label: 'Capacitación',
                    value: '8'
                },
                {
                    type: 'radio',
                    label: 'Fuga prioridad alta',
                    value: '9'
                }, {
                    type: 'radio',
                    label: 'Fuga prioridad baja',
                    value: '10'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        if (data != null) {
                            _this.arreglo.tipoID = parseInt(data);
                            console.log(_this.arreglo.tipoID);
                            _this.tipo_implementacion();
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HallazgosPage.prototype.tipo_implementacion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Tipo implementacion',
            inputs: [
                {
                    type: 'radio',
                    label: 'Acción',
                    value: '1'
                },
                {
                    type: 'radio',
                    label: 'Inversión',
                    value: '2'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        if (data != null) {
                            _this.arreglo.implementacionID = parseInt(data);
                            _this.nuevo_hallazgo(_this.arreglo);
                        }
                    }
                }
            ]
        });
        alert.present();
    };
    HallazgosPage.prototype.nuevo_hallazgo = function (arreglo) {
        var myDate = new Date().toISOString();
        /*
        this.sqlite.create({
          name: 'ionicdb.db',
          location: 'default'
        }).then((db: SQLiteObject)  => {
          db.executeSql('INSERT INTO nuevo_hallazgo VALUES(NULL,?,?,?,?,?,?,?)',[myDate,0,0,arreglo.tipoID,arreglo.implementacionID,arreglo.descripcion,this.id_evento])
            .then(res => {
              console.log(res);
              this.child.getData(this.id_evento);
              this.applicationRef.tick();
              this.toast.show('Nuevo hallazgo', '5000', 'center').subscribe(
                toast => {
                }
              );
            })
            .catch(e => {
              console.log(JSON.stringify(e));
              this.toast.show(e, '5000', 'center').subscribe(
                toast => {
                  console.log(toast);
                }
              );
            });
        }).catch(e => {
          console.log(JSON.stringify(e));
          this.toast.show(e,'5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
      */
    };
    HallazgosPage = tslib_1.__decorate([
        Component({
            selector: 'app-hallazgos',
            templateUrl: './hallazgos.page.html',
            styleUrls: ['./hallazgos.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, ActivatedRoute, Platform, AlertController])
    ], HallazgosPage);
    return HallazgosPage;
}());
export { HallazgosPage };
//# sourceMappingURL=hallazgos.page.js.map