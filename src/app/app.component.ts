import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingService } from './shared/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  
  usuario:String;

  constructor(
    private _loading:LoadingService,
    private router:Router,
    private storage: Storage,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.cargar_usuario();
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._loading.presentLoading("Cargando",1000).then((res)=>{
        alert(JSON.stringify(res))
      },
      err=>{
        alert(JSON.stringify(err))
      });
      
    });
  }

  salir(){
    this.storage.set('who', null);
    this.storage.set('where', null);
    this.router.navigate(['/login',]);
  }

  cargar_usuario() {
    this.storage.get('usuario').then((val) => {
      this.usuario=val;
    });
  }
}
