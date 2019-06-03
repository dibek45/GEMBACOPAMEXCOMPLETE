import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

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

}
