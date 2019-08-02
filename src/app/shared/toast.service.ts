import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

   presentToast(mensaje:string,color:string,position) {
    return new Promise(async (resolve,reject)=>{

      const toast = await this.toastController.create({
        
        message: mensaje,
        duration: 2000,
        color:color,
        position:position
       
      });
      toast.present();
    })
    
  }



  presentToastOpions(header:string,mensaje:string,icon:string) {
    return new Promise(async (resolve,reject)=>{

      const toast = await this.toastController.create({
        header: header,
        message: mensaje,
        position: 'top',
        buttons: [
          {
            side: 'start',
            icon: icon,
            handler: () => {
              reject (false);
            }
          }, {
            text: 'Probar nuevamente',
            handler: () => {
              resolve(true)
            }
          }
        ]
      });
      toast.present();
    })
    
  }

}
