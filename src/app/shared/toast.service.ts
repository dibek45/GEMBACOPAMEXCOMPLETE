import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

   presentToast(mensaje:string,color:string) {
    return new Promise(async (resolve,reject)=>{

      const toast = await this.toastController.create({
        
        message: mensaje,
        duration: 2000,
        color:color
       
      });
      toast.present();
    })
    
  }

}
