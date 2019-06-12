import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
var ListEventosComponent = /** @class */ (function () {
    function ListEventosComponent(storage, router, sqlite, _hallazgo, applicationRef) {
        this.storage = storage;
        this.router = router;
        this.sqlite = sqlite;
        this._hallazgo = _hallazgo;
        this.applicationRef = applicationRef;
        this.nHallazgos = 0;
        this.for_hallazgo_id = 10;
        this.thereIsEvent = new EventEmitter();
    }
    ListEventosComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    ListEventosComponent.prototype.getData = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('who').then(function (val) {
                            _this.whoID = val;
                        })];
                    case 1:
                        _a.sent();
                        this.eventos = [];
                        this.nHallazgos = 0;
                        return [4 /*yield*/, this._hallazgo.get_eventos(this.whoID).then(function (res) {
                                _this.eventos = res;
                                _this.eventos.forEach(function (arrayItem) {
                                    _this.nHallazgos++;
                                });
                                if (_this.nHallazgos == 0)
                                    _this.thereIsEvent.emit(true);
                                else
                                    _this.thereIsEvent.emit(false);
                                console.log(JSON.stringify(res)),
                                    function (err) { console.log(err); };
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListEventosComponent.prototype.deleteData = function (rowid) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._hallazgo.delete_evento(rowid).then(function (res) {
                            //console.log(res);
                        });
                        return [4 /*yield*/, this.getData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListEventosComponent.prototype.obtener_evento = function (id) {
        this.router.navigate(['/hallazgos', { id: id }]);
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], ListEventosComponent.prototype, "thereIsEvent", void 0);
    ListEventosComponent = tslib_1.__decorate([
        Component({
            selector: 'app-list-eventos',
            templateUrl: './list-eventos.component.html',
            styleUrls: ['./list-eventos.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage, Router, SQLite, HallazgosService, ApplicationRef])
    ], ListEventosComponent);
    return ListEventosComponent;
}());
export { ListEventosComponent };
//# sourceMappingURL=list-eventos.component.js.map