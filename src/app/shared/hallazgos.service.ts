import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
//import { LocationService } from './location2.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/timeout';



@Injectable({
  providedIn: 'root'
})
export class HallazgosService {
  
  whoID:number;
  banderaEdit:boolean=false;
  constructor(
   // private _location:LocationService,
    private sqlite: SQLite,public alertController: AlertController, private http:HttpClient) { }


    delete_hallazgo(halazgoID) {
      let eventos = [];
      return new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data4.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql('DELETE FROM hallazgo WHERE hallazgoID=?', [halazgoID])
              .then(() => resolve('Executed SQL'))
              .catch(e => reject(JSON.stringify(e)));
               db.executeSql('DELETE FROM imagen WHERE hallazgoID=?', [halazgoID])
              .then(() => resolve('Executed SQL'))
              .catch(e => reject(JSON.stringify(e)));
          })
          .catch(e => reject(JSON.stringify(e)));
    
      }
    )}

    get_hallazgos(observadorID,plataformaID) {
      let eventos = [];
     return new Promise((resolve, reject) => {
       this.sqlite.create({
         name: 'data4.db',
         location: 'default'
       })
         .then((db: SQLiteObject) => {

              db.executeSql('CREATE TABLE IF NOT EXISTS hallazgo(hallazgoID INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER, areaID INTEGER,tipo_hallazgoID TEXT,tipo_implementacionID INTEGER,descripcion TEXT,observadorID INTEGER,idEvento INTEGER, latitude TEXT,longitude TEXT,plataformaID INTEGER)', [])
             .then(res => console.log('BIEN')).catch(e => console.log(JSON.stringify(e)));
             db.executeSql('CREATE TABLE IF NOT EXISTS imagen(rowid INTEGER PRIMARY KEY, imagen TEXT,imagen_mini TEXT,  fecha TEXT, hallazgoID INTEGER, FOREIGN KEY(hallazgoID) REFERENCES hallazgo (hallazgoID))', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => console.log(JSON.stringify(e)));
             db.executeSql('SELECT h.idEvento, h.hallazgoID,tipo_eventoID,h.fecha,areaID,tipo_hallazgoID,descripcion,tipo_implementacionID,i.imagen,h.observadorID, h.latitude,h.longitude FROM hallazgo h LEFT JOIN (select hallazgoID,min(rowid) rowid FROM imagen group by hallazgoID) i0 ON h.hallazgoID=i0.hallazgoID LEFT JOIN imagen i ON i.rowid=i0.rowid WHERE observadorID=? AND plataformaID=?  ORDER BY h.hallazgoID DESC', [observadorID,plataformaID])
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

   




    async postHallazgos(arreglo,observadorID,latitude:string,longitude:string, plataformaID:number) {
          let  myDate: String = new Date().toISOString();
          
           return await new Promise((resolve, reject) => {
              this.sqlite.create({
                name: 'data4.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
              db.executeSql('INSERT INTO hallazgo VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?)',[myDate,0,0,arreglo.tipoID,arreglo.implementacionID,arreglo.descripcion,observadorID,0,latitude,longitude,plataformaID])
              .then(res => {
                resolve('bien insert');
              }, (error) => {
                  reject(error);
              }).catch(e => reject(JSON.stringify(e)))
          }).catch(e => reject(JSON.stringify(e)));

        })

        
  }

  async editHallazgo(descripcion:string,tipo_implementacionID:number,tipo_hallazgoID:number,hallazgoID:number) {
        
     return await new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data4.db',
          location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('UPDATE hallazgo SET descripcion=?, tipo_implementacionID=?, tipo_hallazgoID=?  WHERE hallazgoID=?',[descripcion,tipo_implementacionID,tipo_hallazgoID,hallazgoID])
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
        header: 'Descripción',
        inputs: [
          {
            name: 'Descripcion',
            type: 'text',
            placeholder: ''
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
  header: 'Tipo de hallazgo',
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
        header: 'Tipo implementación',
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
       name: 'data4.db',
       location: 'default'
     })
       .then((db: SQLiteObject) => {
        db.executeSql(' SELECT  h.hallazgoID, h.idEvento, h.tipo_hallazgoID,h.tipo_implementacionID,h.observadorID,h.descripcion, h.fecha,h.latitude, h.longitude FROM hallazgo  h  JOIN (  SELECT hallazgoID, COUNT(*) imagenes FROM imagen  GROUP BY hallazgoID) i ON i.hallazgoID = h.hallazgoID  WHERE h.hallazgoID=?  GROUP BY h.hallazgoID ',[hallazgoID])
        .then(res => {
          resolve(res.rows.item(0));
        }).catch(e => console.log(JSON.stringify('15'+e)));
       })
       .catch(e => reject(JSON.stringify(e)));
 
   }
 )}
    
  //http
  getHallazgos_api(areaID:number,avanceID:number,responsableID:number,tipoID:number,ano:number,tipoHallazgo:number,empresaID:number,relevante,plataformaID,subareaID,mes){
    let endPoint=`http://10.11.1.8:81/api/hallazgos/${areaID}/${avanceID}/${responsableID}/${tipoID}/${ano}/${tipoHallazgo}/${empresaID}/${relevante}/${plataformaID}/${subareaID}/${mes}`
    return this.http.get(endPoint,);
  }
  getHallazgoByID_api(hallazgoID:number){
    let endPoint=`http://10.11.1.8:81/api/hallazgo/${hallazgoID}`
    return this.http.get(endPoint,);

  }
  insert_hallazgoHttp(eventoID:number,fecha:string,areaID:number,subareaID:number,tipo_hallazgoID:number,tipo_implementacionID:number,
    descripcion:string,observadorID:number,latitude:string,longitude:string) {
  
    const endPoint=`http://10.11.1.8:81/api/hallazgo`;

    return this.http.post(endPoint,{"eventoID":eventoID,"areaID": areaID,"fecha": fecha,"responsableID": 0,
                      "tipo_hallazgoID": tipo_hallazgoID,"tipo_implementacionID": tipo_implementacionID,
                      "descripcion": descripcion,"comentarios": "","subareaID": subareaID,"observadorID": observadorID,
                      "latitude":latitude,"longitude":longitude
              })
        }

    putStateHallazgoHttp(hallazgoID:Number,stateID) {
          const endPoint=`http://10.11.1.8:81/api/hallazgoState/${hallazgoID}/${stateID}`;
          return this.http.put(endPoint,{});
        }

    putComentarioHallazgoHttp(hallazgoID:Number,comentario:String) {
          const endPoint=`http://10.11.1.8:81/api/hallazgoComentario/${hallazgoID}/${comentario}`;
          return this.http.put(endPoint,{});
        }


    pingHttp(url) {
      return new Promise((resolve, reject) => {
        let subscription  = this.http.get('http://10.11.1.8:81/api/ping').timeout(1000).subscribe(res=>{
          resolve('Si');
        },err=>{
          reject('No');
        });
  
        setTimeout(() =>{
          subscription.unsubscribe();
          return 'No'
        } , 1000);
          })
      }

}