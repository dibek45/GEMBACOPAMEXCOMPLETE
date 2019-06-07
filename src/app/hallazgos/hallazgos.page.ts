import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HallazgosService } from '../shared/hallazgos.service';
import { ToastService } from '../shared/toast.service';
import {ListHallazgoComponent }from '../hallazgos/list-hallazgo/list-hallazgo.component';
import { ApplicationRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LocationService } from '../shared/location.service';

@Component({
  selector: 'app-hallazgos',
  templateUrl: './hallazgos.page.html',
  styleUrls: ['./hallazgos.page.scss'],
})

export class HallazgosPage implements OnInit {
  infoEvento;
  flag:boolean;
  id_evento:number;
  show:string;
  parentID:number;
  arreglo={tipoID:0,descripcion:"", implementacionID:0,idEvento:0};
  @ViewChild(ListHallazgoComponent) lista_hallazgos:ListHallazgoComponent;
  hallazgos:any;
  whoID: any;
  usuario: any;
  height = 20;
  coordinates: { latitude: number; longitude: number; };
  plataformaID: number;

  constructor(private _location:LocationService,private storage: Storage,private changeRef: ChangeDetectorRef,private applicationRef : ApplicationRef, private _toast:ToastService,private _hallazgo:HallazgosService,private router:Router,private route: ActivatedRoute,public platform: Platform,public alertController: AlertController) {
    this.height = platform.height() - 56;

    this.flag=false;
    this.platform.backButton.subscribeWithPriority(0, () => {

    })
   }
   async getLocatizacion(){
    await this._location.getPosition().subscribe(
      (pos: Position) => {
          this.coordinates = {
            latitude:  +(pos.coords.latitude),
            longitude: +(pos.coords.longitude)
          };
      });
    //  await alert(JSON.stringify(this.coordinates))
   }

   back(){
     if (this.show=="lista") {
      this.router.navigate(['/plataforma',{"usuario":this.usuario}]);
    }else
     if (this.show=="hallazgo") {
      this.show="lista";
     }

   }

  ngOnInit() {
  this.getLocatizacion();
   this.route.params.subscribe(params => {
        this.plataformaID = +params['plataformaID']; // (+) converts string 'id' to a number
        this.usuario =params['usuario'];
    });
    this.show="lista";
  }
  ionViewDidEnter() {
    this.storage.get('who').then((val) => {
     // alert(val)
      this.whoID=val;
    });
    this.storage.get('where').then((val) => {
      console.log('Where:'+ val);
    });
    this.storage.get('usuario').then((val) => {
      this.usuario=val;
    });
  }

  getData(id:number) {

    this.hallazgos=[];
      this._hallazgo.get_hallazgos(this.whoID).then((result) => {
        this.hallazgos = <Array<Object>> result;
    }, (error) => {
        console.log("ERROR: "+JSON.stringify(error));
    });
  }

  async presentAlertPromptDescription() {
    this._hallazgo.alert_descripcion().then(res=>{
      let result:string;
      result=JSON.stringify(res);
      this.arreglo.descripcion=result;
      this.alertTipoRadio();

    })

  }
  async alertTipoRadio() {
   this._hallazgo.alert_radio().then(res=>{
     this.arreglo.tipoID=parseInt(JSON.stringify(res));
     this.alertTipoImplementacion();
   })
  }

  async alertTipoImplementacion() {
    await this._hallazgo.alert_tipo_implementacion().then(res=>{
    this.arreglo.implementacionID=parseInt(JSON.stringify(res));
    this.arreglo.idEvento=this.id_evento;
    })
    await this.nuevo_hallazgo();
  }
  
   async nuevo_hallazgo(){
     await this.getLocatizacion();
  
     if (this.coordinates) {
      await this._hallazgo.postHallazgos(this.arreglo,this.whoID,String(this.coordinates.latitude),String(this.coordinates.longitude)).then(res=>{
        this._toast.presentToast("Hallazgo agregado y localizacion",'success');
        })
     }else{
      await this._hallazgo.postHallazgos(this.arreglo,this.whoID,null,null).then(res=>{
        this._toast.presentToast("Hallazgo agregado sin localizacion",'warning');
        })

     }

      this.flag=true;

   }

   itemHallasgo(id:number):void{
    this.parentID=id;
    this.show="hallazgo";
    }




  

    checarInfoHallazgo(event){
     this.infoEvento=event;
      this.flag=true
    }

    go(menu){
      if (menu=='salir') {
        this.storage.set('who', null);
      this.storage.set('where', null);
      this.router.navigate(['/login',]);
      }else
      this.router.navigate([`/${menu}`,{"usuario":this.usuario,plataformaID:this.plataformaID}]);
  
    }


    
  
}
