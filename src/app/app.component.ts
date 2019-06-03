import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  public appPages = [
    {
      title: 'Buscar hallazgos',
      url: '/principal',
      icon: 'search'
    },
    {
      title: 'Subir hallazgos',
      url: '/hallazgos',
      icon: 'cloud-upload'
    }
  ];
  usuario:String;

  constructor(
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
