import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UsuarioService } from '../shared/usuario.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, storage, alertCtrl, _usuario, router) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this._usuario = _usuario;
        this.router = router;
        this.validacion = true;
        this.model = {
            usuario: '',
            password: ''
        };
    }
    LoginPage.prototype.ionViewDidEnter = function () {
        this.lookForSession();
    };
    LoginPage.prototype.lookForSession = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get('who').then(function (val) {
                            //console.log(val)
                            if (val != null)
                                _this.router.navigateByUrl('/addEvents');
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.logForm = function (form) {
        var _this = this;
        this._usuario.log_in(form.value.usuario, form.value.password).subscribe(function (data) {
            // console.log(JSON.stringify(data));
            _this.storage.set('who', data[0].usuarioID);
            _this.storage.set('where', data[0].empresaID);
            _this.router.navigate(['/addEvents', { ids: [222, 999] }]);
        });
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: 'login.page.html',
            styleUrls: ['login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Storage,
            AlertController,
            UsuarioService,
            Router])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map