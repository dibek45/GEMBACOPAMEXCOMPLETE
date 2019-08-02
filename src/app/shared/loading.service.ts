import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingController: LoadingController,) { }

  async presentLoading(texto:string,tiempo:number) {
    return new Promise(async (resolve,reject)=>{
      const loading = await this.loadingController.create({
        message: texto,
        duration: tiempo
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
  
      console.log('Loading dismissed!');
    })
   
  }
}
