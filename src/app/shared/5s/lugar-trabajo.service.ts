import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { LugarTrabajo } from 'src/app/shared/5s/lugar-trabajo.model';
import { QuestionService } from './question.service';


@Injectable({
  providedIn: 'root'
})
export class LugarTrabajoService {

  constructor(private sqlite: SQLite, private http: HttpClient,private _questions: QuestionService,) { }



  async postLugarTrabajo(lugarTrabajo:LugarTrabajo) {
  

    return await new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data4.db',
          location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO lugarTrabajo2 VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?)', [lugarTrabajo.lugarTrabajo, lugarTrabajo.fecha, lugarTrabajo.observadorID, lugarTrabajo.areaID, lugarTrabajo.subAreaID, lugarTrabajo.eventoID,lugarTrabajo.tipoAuditoria,0,0,0,0])
        .then(res => {
          resolve(res);
        }, (error) => {
            reject('2'+JSON.stringify(error));
        }).catch(e => reject('3'+JSON.stringify(e)));
    }).catch(e => reject('4'+JSON.stringify(e)));
  });
}

getLugarTrabajo(observadorID) {
  let lugares = [];
  return new Promise((resolve, reject) => {
   this.sqlite.create({
     name: 'data4.db',
     location: 'default'
   }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS lugarTrabajo2(lugarTrabajoID INTEGER PRIMARY KEY, lugarTrabajo TEXT, fecha TEXT, observadorID INTEGER, areaID INTEGER,subAreaID INTEGER,eventoID INTEGER, tipoAuditoria INTEGER,calificacion1s REAL,calificacion2s REAL,calificacion3s REAL,calificacion5s REAL)', [])
      .then(res => console.log('BIEN')).catch(e => reject(JSON.stringify(e)));
      db.executeSql(`SELECT l.lugarTrabajoID, l.lugarTrabajo, l.fecha, l.observadorID, l.areaID, l.subAreaID, l.tipoAuditoria, i.preguntasAbiertas FROM  lugarTrabajo2 l LEFT JOIN (SELECT lugarID, COUNT(*) preguntasAbiertas FROM question108 WHERE contestada=0) i ON i.lugarID=l.lugarTrabajoID ORDER BY l.lugarTrabajoID DESC`, [])
      .then((res) => {
        for (let i = 0; i < res.rows.length; i++) {
          lugares.push(res.rows.item(i));
        }
        resolve(lugares);
           }).catch(e => reject(JSON.stringify(e)));
     }).catch(e => reject(JSON.stringify(e)));
 }
)}


delete_hallazgo(lugarTrabajoID) {

  return new Promise((resolve, reject) => {
    this.sqlite.create({
      name: 'data4.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM lugarTrabajo2 WHERE lugarTrabajoID=?', [lugarTrabajoID])
          .then(() => console.log('Executed SQL'))
          .catch(e => reject(JSON.stringify(e)));
          db.executeSql('DELETE FROM question107 WHERE lugarID=?', [lugarTrabajoID])
          .then(() => resolve('questions eliminada'))
          .catch(e => reject(JSON.stringify(e)));
      
      })
      .catch(e => reject(JSON.stringify(e)));

  }
)}


}
