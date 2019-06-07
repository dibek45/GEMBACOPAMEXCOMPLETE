import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LocationService } from './location.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HallazgosService {
  
  whoID:number;

  constructor(private _location:LocationService,private sqlite: SQLite,public alertController: AlertController, private http:HttpClient) { }

  insert_evento(whoID) {
      return new Promise((resolve, reject) => {
        let  myDate: String = new Date().toISOString();
        this.sqlite.create({
          name: 'data2.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS Eventos92(idEvento INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER,tipo_evento TEXT,area TEXT, areaID INTEGER,subarea TEXT, subareaID INTEGER, whoID INTEGER)', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => alert(JSON.stringify(e)));
              db.executeSql('INSERT INTO Eventos92 VALUES(NULL,?,?,?,?,?,?,?,?)',[myDate,0,"","",0,"",0,whoID])
              .then(() => resolve('Executed SQL'))
              .catch(e => reject(JSON.stringify(e)));
          })
          .catch(e => alert(JSON.stringify(e)));
    
      }
    )}

     get_eventos(whoID) {
       let eventos = [];
      return new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data2.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS Eventos92(idEvento INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER,tipo_evento TEXT,area TEXT, areaID INTEGER,subarea TEXT, subareaID INTEGER, whoID INTEGER)', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => alert(JSON.stringify(e)));
              db.executeSql('SELECT e.idEvento, e.tipo_evento,e.tipo_eventoID, IFNULL( h.hallazgos,0) hallazgos,e.fecha,e.areaID,h.imagenes FROM Eventos92 e LEFT JOIN( SELECT h.idEvento, COUNT(*) hallazgos, SUM(i.imagenes) imagenes FROM nuevo_hallazgo  h  JOIN (  SELECT hallazgoID, COUNT(*) imagenes FROM imagenes_table  GROUP BY hallazgoID) i ON i.hallazgoID = h.hallazgoID GROUP BY h.idEvento) h ON h.idEvento = e.idEvento WHERE whoID=?', [whoID])
              .then((res) => {
             
                for (let i = 0; i < res.rows.length; i++) {
                  eventos.push(res.rows.item(i));
                }
                resolve(eventos);
                })
              .catch(e => reject(JSON.stringify(e)));
          })
          .catch(e => reject(JSON.stringify(e)));
    
      }
    )}


  delete_evento(eventoID) {
      let eventos = [];
      return new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data2.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM Eventos92 WHERE idEvento=?', [eventoID])
              .then(() => console.log('Executed SQL'))
              .catch(e => alert(JSON.stringify(e)));
              
          })
          .catch(e => alert(JSON.stringify(e)));
    
      }
    )}

    delete_hallazgo(halazgoID) {
      let eventos = [];
      return new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data2.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM nuevo_hallazgo WHERE hallazgoID=?', [halazgoID])
              .then(() => console.log('Executed SQL'))
              .catch(e => alert(JSON.stringify(e)));
               db.executeSql('DELETE FROM imagenes_table WHERE hallazgoID=?', [halazgoID])
              .then(() => console.log('Executed SQL'))
              .catch(e => alert(JSON.stringify(e)));
              
          })
          .catch(e => alert(JSON.stringify(e)));
    
      }
    )}



    get_hallazgos(observadorID) {
      let eventos = [];
     return new Promise((resolve, reject) => {
       this.sqlite.create({
         name: 'data2.db',
         location: 'default'
       })
         .then((db: SQLiteObject) => {
           db.executeSql('CREATE TABLE IF NOT EXISTS Eventos92(idEvento INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER,tipo_evento TEXT,area TEXT, areaID INTEGER,subarea TEXT, subareaID INTEGER, whoID INTEGER)', [])
             .then(() => console.log('Executed SQL'))
             .catch(e => alert(JSON.stringify(e)));

             db.executeSql('CREATE TABLE IF NOT EXISTS nuevo_hallazgo(hallazgoID INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER, areaID INTEGER,tipo_hallazgoID TEXT,tipo_implementacionID INTEGER,descripcion TEXT,observadorID INTEGER,idEvento INTEGER, latitude TEXT,longitude TEXT, FOREIGN KEY(idEvento) REFERENCES Eventos92 (idEvento))', [])
             .then(res => console.log('BIEN')).catch(e => console.log(JSON.stringify(e)));
             db.executeSql('CREATE TABLE IF NOT EXISTS imagenes_table(rowid INTEGER PRIMARY KEY, imagen TEXT,imagen_mini TEXT,  fecha TEXT, hallazgoID INTEGER, FOREIGN KEY(hallazgoID) REFERENCES nuevo_hallazgo (hallazgoID))', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => alert(JSON.stringify(e)));
             db.executeSql('SELECT h.idEvento, h.hallazgoID,tipo_eventoID,h.fecha,areaID,tipo_hallazgoID,descripcion,tipo_implementacionID,i.imagen,h.observadorID, h.latitude,h.longitude FROM nuevo_hallazgo h LEFT JOIN (select hallazgoID,min(rowid) rowid FROM imagenes_table group by hallazgoID) i0 ON h.hallazgoID=i0.hallazgoID LEFT JOIN imagenes_table i ON i.rowid=i0.rowid', [])
             .then((res) => {
            
               for (let i = 0; i < res.rows.length; i++) {
                 eventos.push(res.rows.item(i));
               }
               resolve(eventos);
               })
             .catch(e => reject(JSON.stringify(e)));
         })
         .catch(e => reject(JSON.stringify(e)));
   
     }
   )}

   




    async postHallazgos(arreglo,observadorID,latitude:string,longitude:string) {
          let  myDate: String = new Date().toISOString();
          
         
           return await new Promise((resolve, reject) => {
              this.sqlite.create({
                name: 'data2.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
              db.executeSql('CREATE TABLE IF NOT EXISTS nuevo_hallazgo(hallazgoID INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER, areaID INTEGER,tipo_hallazgoID TEXT,tipo_implementacionID INTEGER,descripcion TEXT,observadorID INTEGER,idEvento INTEGER,latitude TEXT,longitude TEXT, FOREIGN KEY(idEvento) REFERENCES Eventos92 (idEvento))', [])
              .then(res => console.log('BIEN')).catch(e => console.log(JSON.stringify(e)));
              db.executeSql('INSERT INTO nuevo_hallazgo VALUES(NULL,?,?,?,?,?,?,?,?,?,?)',[myDate,0,0,arreglo.tipoID,arreglo.implementacionID,arreglo.descripcion,observadorID,0,latitude,longitude])
              .then(res => {
                resolve('bien insert');
              }, (error) => {
                  reject(error);
              }).catch(e => reject(JSON.stringify(e)))
          }).catch(e => reject(JSON.stringify(e)));

        })

        
  }

   alert_descripcion(){
    return new Promise(async (resolve,reject)=>{
      const alert = await this.alertController.create({
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
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
           resolve(data.Descripcion);
            
            }
          }
        ]
      });
  
      await alert.present();
  
    })
  }





  alert_radio(){
    return new Promise(async (resolve,reject)=>{
      


const alert = await this.alertController.create({
  header: 'Radio',
  inputs: [
    {
      name: 'radio1',
      type: 'radio',
      label: '1ra Selección',
      value: '1',
      checked: true
    },
    {
      name: 'radio2',
      type: 'radio',
      label: '2da Orden',
      value: '2'
    },
    {
      name: 'radio3',
      type: 'radio',
      label: '3ra Limpieza',
      value: '3'
    },
    {
      name: 'radio4',
      type: 'radio',
      label: 'Mejora',
      value: '4'
    },
    {
      name: 'radio5',
      type: 'radio',
      label: 'Reparación',
      value: '5'
    },
    {
      name: 'radio6',
      type: 'radio',
      label: 'Seguridad ',
      value: '6'
    },
    {
      name: 'radio6',
      type: 'radio',
      label: '4a Estandarización ',
      value: '7'
    },
    {
      name: 'radio6',
      type: 'radio',
      label: 'Capacitación',
      value: '8'
    },
    {
      name: 'radio6',
      type: 'radio',
      label: 'Fuga prioridad alta',
      value: '9'
    },
    {
      name: 'radio6',
      type: 'radio',
      label: 'Fuga prioridad baja',
      value: '10'
    }
  ],
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        console.log('Confirm Cancel');
      }
    }, {
      text: 'Ok',
      handler: (data:string) => {
        resolve(parseInt(data));
        
      }
    }
  ]
});

await alert.present();
  
    })
  }

  alert_tipo_implementacion(){
    return new Promise(async (resolve,reject)=>{
      const alert = await this.alertController.create({
        header: 'Radio',
        inputs: [
          {
            name: 'radio1',
            type: 'radio',
            label: 'Acción',
            value: '1',
            checked: true
          },
          {
            name: 'radio2',
            type: 'radio',
            label: 'Inversión',
            value: '2'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data:string) => {
              if (data!=null) {
               resolve(parseInt(data)); 
              }
            }
          }
        ]
      });
  
      await alert.present();
    })
  }
 
  //hallazgoLocal
  get_hallazgoLocalByID(hallazgoID) {
    let eventos = [];
   return new Promise((resolve, reject) => {
     this.sqlite.create({
       name: 'data2.db',
       location: 'default'
     })
       .then((db: SQLiteObject) => {
        db.executeSql(' SELECT  h.hallazgoID, h.idEvento, h.tipo_hallazgoID,h.tipo_implementacionID,h.observadorID,h.descripcion, h.fecha,h.latitude, h.longitude FROM nuevo_hallazgo  h  JOIN (  SELECT hallazgoID, COUNT(*) imagenes FROM imagenes_table  GROUP BY hallazgoID) i ON i.hallazgoID = h.hallazgoID  WHERE h.hallazgoID=?  GROUP BY h.hallazgoID ',[hallazgoID])
        .then(res => {
          resolve(res.rows.item(0));
        }).catch(e => console.log(JSON.stringify('15'+e)));
      
       })
       .catch(e => reject(JSON.stringify(e)));
 
   }
 )}
    
  //http
  getHallazgos_api(areaID:number,avanceID:number,responsableID:number,tipoID:number,ano:number,tipoHallazgo:number,empresaID:number,relevante,plataformaID){
    let endPoint=`http://10.11.1.8:81/api/hallazgos/${areaID}/${avanceID}/${responsableID}/${tipoID}/${ano}/${tipoHallazgo}/${empresaID}/${relevante}/${plataformaID}`
    return this.http.get(endPoint,);
  }
  getHallazgoByID_api(hallazgoID:number){
    let endPoint=`http://10.11.1.8:81/api/hallazgo/${hallazgoID}`
    return this.http.get(endPoint,);

  }
  insert_hallazgoHttp(eventoID:number,fecha:string,areaID:number,subareaID:number,tipo_hallazgoID:number,tipo_implementacionID:number,
    descripcion:string,observadorID:number,latitude:string,longitude:string) {
  
    const endPoint=`${environment.apiBaseUrl}/hallazgo`;

    return this.http.post(endPoint,{"eventoID":eventoID,"areaID": areaID,"fecha": fecha,"responsableID": 0,
                      "tipo_hallazgoID": tipo_hallazgoID,"tipo_implementacionID": tipo_implementacionID,
                      "descripcion": descripcion,"comentarios": "","subareaID": subareaID,"observadorID": observadorID,
                      "latitude":latitude,"longitude":longitude
              })
        }

    putStateHallazgoHttp(hallazgoID:Number,stateID) {
          const endPoint=`${environment.apiBaseUrl}/hallazgoState/${hallazgoID}/${stateID}`;
          return this.http.put(endPoint,{});
        }

    putComentarioHallazgoHttp(hallazgoID:Number,comentario:String) {
          const endPoint=`${environment.apiBaseUrl}/hallazgoComentario/${hallazgoID}/${comentario}`;
          return this.http.put(endPoint,{});
        }
}

