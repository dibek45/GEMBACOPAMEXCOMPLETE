import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private camera: Camera,private sqlite: SQLite, private http:HttpClient) { }


    save_imagen_camera(dataimagen:string,id_hallazgo:Number) {
    
    return new Promise((resolve, reject) => {
      let  myDate: String = new Date().toISOString();   
        this.sqlite.create({
          name: 'data2.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO imagenes_table VALUES(NULL,?,?,?,?)',[dataimagen,dataimagen,myDate,id_hallazgo])
            .then(res => {
            resolve("se inserto bien")
            })
            .catch(e => {
              reject("Mal")
            });
        }).catch(e => {
          reject(JSON.stringify(e));
          
        });
     }
  )}

  get_ImagenesHallazgos(id) {
    return new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data2.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            
            db.executeSql('CREATE TABLE IF NOT EXISTS nuevo_hallazgo(hallazgoID INTEGER PRIMARY KEY, fecha TEXT, tipo_eventoID INTEGER, areaID INTEGER,tipo_hallazgoID TEXT,tipo_implementacionID INTEGER,descripcion TEXT,observadorID INTEGER,idEvento INTEGER,latitude TEXT,longitude TEXT, FOREIGN KEY(idEvento) REFERENCES Eventos92 (idEvento))', [])
            .then(res => console.log('BIEN')).catch(e => console.log(JSON.stringify(e)));
            db.executeSql('CREATE TABLE IF NOT EXISTS imagenes_table(rowid INTEGER PRIMARY KEY, imagen TEXT,imagen_mini TEXT,  fecha TEXT, hallazgoID INTEGER, FOREIGN KEY(hallazgoID) REFERENCES nuevo_hallazgo (hallazgoID))', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => alert(JSON.stringify(e)));
             
              db.executeSql('SELECT * FROM imagenes_table WHERE hallazgoID=? ', [id])
              .then((res) => {
                let imagenes = [];
                for(var i=0; i<res.rows.length; i++) {
                  // alert(res.rows.item(i).rowid);
                  let evidencia = res.rows.item(i).imagen;
                  imagenes.push({rowid:res.rows.item(i).rowid,imagen:evidencia,fecha:res.rows.item(i).fecha})
                }
                resolve(imagenes);
                
                })
              .catch(e => {reject(JSON.stringify(e))});
          })
          .catch(e => reject(JSON.stringify(e)));

      }
  )}

  getImagesApi(hallazgoID:number,tipoID:number){
    let endPoint=`http://10.11.1.8:81/api/evidencia/${hallazgoID}/${tipoID}`
    return this.http.get(endPoint);
  }


  insert_imagenHttp(hallazoID:number,imagen_normal:string,imagen_mini) {
    const endPoint=`http://10.11.1.8:81/api/evidencia`;
  
          return this.http.post(endPoint,{
          "hallazgoID": hallazoID, 
          "archivo": imagen_normal,  
          "tipo": 0,
          "archivo_mini":imagen_mini      
          });
  }
  
  insert_imagenHttpAfter(hallazoID:number,imagen_normal:string,imagen_mini) {
    const endPoint=`http://10.11.1.8:81/api/evidencia`;
  
          return this.http.post(endPoint,{
          "hallazgoID": hallazoID, 
          "archivo": imagen_normal,  
          "tipo": 1,
          "archivo_mini":imagen_mini      
          });
  }


  getImageFileCamara(type:number) {
    
    return new Promise((resolve, reject) => {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType:type,
      }
  
      this.camera.getPicture(options).then((imageData) => {
        let image = `data:image/jpeg;base64,${imageData}`;
        resolve(image);
      }, (err) => {
        reject(err)
      });
     }
  )}

  b64resize(URI,maxSize) {
    return new Promise((resolve, reject)=> {
      if (URI == null) return reject();
          var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image = new Image();
          image.addEventListener('load',()=> {
  
          canvas.width = image.width;
          canvas.height = image.height;
          var canvas2 = document.createElement('canvas');
          var width = image.width;
          var height = image.height;
  
            if (width > height) {
                if (width > maxSize) {
                    height *= maxSize / width;
                    width = maxSize;
                }
              }else{
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
          }
          canvas2.width = width;
          canvas2.height = height;
          canvas2.getContext('2d').drawImage(image, 0, 0, width, height);
          var dataUrl = canvas2.toDataURL('image/jpeg');
          resolve(dataUrl)
      }, false);
      image.src = URI;
    });
  
  }
}
