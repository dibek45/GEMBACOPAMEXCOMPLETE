import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

  alert_descripcion() {
    return new Promise(async (resolve, reject) => {
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
    });
  }


  alert_input(headerTxt, nametxt, placeHonder) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertController.create({
        header: headerTxt,
        inputs: [
          {
            name: nametxt,
            type: 'text',
            placeholder: placeHonder
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
           resolve(data);
            }
          }
        ]
      });
      await alert.present();
    });
  }


  async AlertRadio(txtHeader,txtName,txtLabel,txtName2,txtLabel2) {
    return new Promise(async (resolve, reject) => {
    const alert = await this.alertController.create({
      header: txtHeader,
      inputs: [
        {
          name: txtName,
          type: 'radio',
          label: txtLabel,
          value: 1,
          checked: true
        },
        {
          name: txtName2,
          type: 'radio',
          label: txtLabel2,
          value: 2
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            resolve(data);
          }
        }
      ]
    });

    await alert.present();
  });
  }

}
