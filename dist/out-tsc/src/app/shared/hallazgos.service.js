import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
var HallazgosService = /** @class */ (function () {
    function HallazgosService(sqlite) {
        this.sqlite = sqlite;
    }
    HallazgosService.prototype.insert_evento = function (whoID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var myDate = new Date().toISOString();
            _this.sqlite.create({
                name: 'data2.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('CREATE TABLE IF NOT EXISTS Eventos92(idEvento INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER,tipo_evento TEXT,area TEXT, areaID INTEGER,subarea TEXT, subareaID INTEGER, whoID INTEGER)', [])
                    .then(function () { return console.log('Executed SQL'); })
                    .catch(function (e) { return alert(JSON.stringify(e)); });
                db.executeSql('INSERT INTO Eventos92 VALUES(NULL,?,?,?,?,?,?,?,?)', [myDate, 0, "", "", 0, "", 0, whoID])
                    .then(function () { return resolve('Executed SQL'); })
                    .catch(function (e) { return reject(JSON.stringify(e)); });
            })
                .catch(function (e) { return alert(JSON.stringify(e)); });
        });
    };
    HallazgosService.prototype.get_eventos = function (whoID) {
        var _this = this;
        var eventos = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data2.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('CREATE TABLE IF NOT EXISTS Eventos92(idEvento INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER,tipo_evento TEXT,area TEXT, areaID INTEGER,subarea TEXT, subareaID INTEGER, whoID INTEGER)', [])
                    .then(function () { return console.log('Executed SQL'); })
                    .catch(function (e) { return alert(JSON.stringify(e)); });
                db.executeSql('Select * from Eventos92', [])
                    .then(function (res) {
                    for (var i = 0; i < res.rows.length; i++) {
                        eventos.push(res.rows.item(i));
                    }
                    resolve(eventos);
                })
                    .catch(function (e) { return reject(JSON.stringify(e)); });
            })
                .catch(function (e) { return reject(JSON.stringify(e)); });
        });
    };
    HallazgosService.prototype.delete_evento = function (eventoID) {
        var _this = this;
        var eventos = [];
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'data2.db',
                location: 'default'
            })
                .then(function (db) {
                db.executeSql('DELETE FROM Eventos92 WHERE idEvento=?', [eventoID])
                    .then(function () { return console.log('Executed SQL'); })
                    .catch(function (e) { return alert(JSON.stringify(e)); });
            })
                .catch(function (e) { return alert(JSON.stringify(e)); });
        });
    };
    HallazgosService.prototype.getHallazgos = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.sqlite.create({
                name: 'ionicdb.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql('CREATE TABLE IF NOT EXISTS nuevo_hallazgo(hallazgoID INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER, areaID INTEGER,tipo_hallazgoID TEXT,tipo_implementacionID INTEGER,descripcion TEXT,idEvento INTEGER, FOREIGN KEY(idEvento) REFERENCES Eventos92 (idEvento))', [])
                    .then(function (res) { return console.log('BIEN'); }).catch(function (e) { return console.log(JSON.stringify(e)); });
                db.executeSql('SELECT * FROM nuevo_hallazgo WHERE idEvento=? ORDER BY hallazgoID ASC  ', [id])
                    .then(function (res) {
                    var hallazgos = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        hallazgos.push({
                            rowid: res.rows.item(i).hallazgoID,
                            tipo_eventoID: res.rows.item(i).tipo_eventoID,
                            fecha: res.rows.item(i).fecha,
                            areaID: res.rows.item(i).areaID,
                            tipo_hallazgoID: res.rows.item(i).tipo_hallazgoID,
                            descripcion: res.rows.item(i).descripcion,
                            tipo_implementacionID: res.rows.item(i).tipo_implementacionID
                        });
                        console.log(JSON.stringify(hallazgos));
                    }
                    resolve(hallazgos);
                }, function (error) {
                    reject(error);
                }).catch(function (e) { return console.log(JSON.stringify(e)); });
            }).catch(function (e) { return console.log(JSON.stringify(e)); });
        });
    };
    HallazgosService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [SQLite])
    ], HallazgosService);
    return HallazgosService;
}());
export { HallazgosService };
//# sourceMappingURL=hallazgos.service.js.map