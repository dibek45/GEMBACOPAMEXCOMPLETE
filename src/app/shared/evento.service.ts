import { Injectable } from '@angular/core';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import {environment}  from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(private sqlite: SQLite,private http:HttpClient) { }

  getEventos(whoID:number,where:number,plataformaID:number) {return this.http.get(`http://10.11.1.8:81/api/area/${where}/${plataformaID}`);
  }
  getArea(whoID:number,where:number) {return this.http.get(`http://10.11.1.8:81/api/areas/${where}`);
  }
  getSubArea(eventoID:number) {
    return this.http.get(`http://10.11.1.8:81/api/subArea/${eventoID}`);
  }


  putEvent(tipo_eventoID:number,tipo_evento:string,areaID:number,area:string,sub_areaID:number,id_params:number){
        return new Promise((resolve,reject)=>{
              this.sqlite.create({
                name: 'data2.db',
                location: 'default'
              }).then((db: SQLiteObject) => {
                db.executeSql('CREATE TABLE IF NOT EXISTS Eventos92(idEvento INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER,tipo_evento TEXT,area TEXT, areaID INTEGER,subarea TEXT, subareaID INTEGER, whoID INTEGER)', [])
                .then(() => console.log('Executed SQL'))
                .catch(e => console.log(JSON.stringify(e)));
                db.executeSql('UPDATE Eventos92 SET tipo_eventoID=?,tipo_evento=?, areaID=?, area=?,subareaID=? WHERE idEvento=?',[tipo_eventoID,tipo_evento,areaID,area,sub_areaID,id_params])
                  .then(res => resolve(res))
                  .catch(e  => reject(e));
              }).catch(e => {
                reject(e);
              });
        })
  }

}
