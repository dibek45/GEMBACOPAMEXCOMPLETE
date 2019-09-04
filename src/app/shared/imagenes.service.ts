import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';



@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private camera: Camera, private sqlite: SQLite, private http: HttpClient) { }


save_imagen_camera(dataimagen: string, id_hallazgo: Number) {
    
    return new Promise((resolve, reject) => {
      let  myDate: String = new Date().toISOString();   
      this.sqlite.create({
          name: 'data4.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO imagen VALUES(NULL,?,?,?,?)', [dataimagen, dataimagen, myDate, id_hallazgo])
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

  update_imagen_camera(dataimagen: string, imageID: Number) {
    
    return new Promise((resolve, reject) => {
      let  myDate: String = new Date().toISOString();   
      this.sqlite.create({
          name: 'data4.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('UPDATE imagen SET imagen=? WHERE rowid=? ', [dataimagen, imageID])
            .then(res => {
            resolve("se actualizo bien");
            })
            .catch(e => {
              reject("Mal")
            });
        }).catch(e => {
          reject(JSON.stringify(e));
          
        });
     }
  )}

  delete_imagen(imageID: Number) {
    
    return new Promise((resolve, reject) => {
      let  myDate: String = new Date().toISOString();   
      this.sqlite.create({
          name: 'data4.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('delete FROM imagen WHERE rowid=? ', [imageID])
            .then(res => {
              resolve("Imagen eliminada");
            })
            .catch(e => {
              reject(e);
            });
        }).catch(e => {
          reject(JSON.stringify(e));
          
        });
     }
  )}

  get_ImagenesHallazgos(id) {
    return new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data4.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {             
              db.executeSql('SELECT * FROM imagen WHERE hallazgoID=? ', [id])
              .then((res) => {
                let imagenes = [];
                for (var i = 0; i < res.rows.length; i++) {
                  // console.log(res.rows.item(i).rowid);
                  let evidencia = res.rows.item(i).imagen;
                  imagenes.push({rowid: res.rows.item(i).rowid, imagen: evidencia, fecha: res.rows.item(i).fecha})
                }
                resolve(imagenes);
                
                })
              .catch(e => {reject(JSON.stringify(e))});
          })
          .catch(e => reject(JSON.stringify(e)));

      }
  )}

  getImagesApi(hallazgoID: number, tipoID: number){
    let endPoint = `http://10.11.1.8:81/api/evidencia/${hallazgoID}/${tipoID}`
    return this.http.get(endPoint);
  }


  insert_imagenHttp(hallazoID: number, imagen_normal: string, imagen_mini) {
    const endPoint = `http://10.11.1.8:81/api/evidencia`;
  
    return this.http.post(endPoint, {
          "hallazgoID": hallazoID, 
          "archivo": imagen_normal,  
          "tipo": 0,
          "archivo_mini": imagen_mini      
          });
  }
  
  insert_imagenHttpAfter(hallazoID: number, imagen_normal: string, imagen_mini) {
    const endPoint = `http://10.11.1.8:81/api/evidencia`;
  
    return this.http.post(endPoint, {
          "hallazgoID": hallazoID, 
          "archivo": imagen_normal,  
          "tipo": 1,
          "archivo_mini": imagen_mini      
          });
  }


  getImageFileCamara(type: number) {
    
    return new Promise((resolve, reject) => {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        sourceType: type,
      }
  
      this.camera.getPicture(options).then((imageData) => {
        let image = `data:image/jpeg;base64,${imageData}`;
        resolve(image);
      }, (err) => {
        reject(err)
      });
     }
  )}

  b64resize(URI, maxSize) {
    return new Promise((resolve, reject) => {
      if (URI == null) return reject();
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image = new Image();
      image.addEventListener('load', () => {
  
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

  get_evidencias5s(questionID) {
      let evidencias = [];
      return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data4.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {            
              db.executeSql('CREATE TABLE IF NOT EXISTS evidencia(evidenciaID INTEGER PRIMARY KEY, imagen TEXT,  fecha TEXT, questionID INTEGER, FOREIGN KEY(questionID) REFERENCES question107 (questionID))', [])
              .then(() => console.log('Executed SQL'))
              .catch(e => reject(JSON.stringify(e)));
              db.executeSql('SELECT * FROM evidencia WHERE questionID=? ORDER BY questionID DESC', [questionID])
            .then((res) => {
              for (let i = 0; i < res.rows.length; i++) {
                evidencias.push(res.rows.item(i));
              }
              resolve(evidencias);
              })
            .catch(e => reject(JSON.stringify(e)));
        })
        .catch(e => reject(JSON.stringify(e)));
  
    }
  )}



  save_imagen_camera5sLocal(dataimagen: string, preguntaID: number) {
    return new Promise((resolve, reject) => {
      let  myDate: String = new Date().toISOString();
      this.sqlite.create({
          name: 'data4.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('INSERT INTO evidencia VALUES(NULL,?,?,?)', [dataimagen, myDate, preguntaID])
            .then(res => {
            resolve('se inserto bien');
            })
            .catch(e => {
              reject('Mal');
            });
        }).catch(e => {
          reject(JSON.stringify(e));
        });
     }
  )}


  delete_evidencia5s(evidenciaID: number) {
    
    return new Promise((resolve, reject) => {
      let  myDate: String = new Date().toISOString();   
      this.sqlite.create({
          name: 'data4.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql('delete FROM evidencia WHERE evidenciaID=? ', [evidenciaID])
            .then(res => {
              resolve("Imagen eliminada");
            })
            .catch(e => {
              reject(e);
            });
        }).catch(e => {
          reject(JSON.stringify(e));
          
        });
     }
  )}
}
