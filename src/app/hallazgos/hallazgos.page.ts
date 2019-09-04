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
//import { LocationService } from '../shared/location2.service';
import { DiseñoService } from '../shared/diseño.service';
import { AreasListHallazgosComponent } from './admi/areas-list-hallazgos/areas-list-hallazgos.component';
import { EventListHallazgosComponent } from './admi/eventos/event-list-hallazgos/event-list-hallazgos.component';

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
  whereID: number;
  color="danger";
  conexion: any;
  banderaEdit:boolean=false;
  banderaEditLocal: boolean;
  permiso: any;
  @ViewChild(AreasListHallazgosComponent) areasList: AreasListHallazgosComponent;
  @ViewChild(EventListHallazgosComponent) eventosList: EventListHallazgosComponent;
  areaID: any;


  constructor(private _diseño:DiseñoService,private route: ActivatedRoute, 
  //  private _location:LocationService,
              private storage: Storage,private changeRef: ChangeDetectorRef,
              private applicationRef : ApplicationRef, private _toast:ToastService,
              private _hallazgo:HallazgosService,private router:Router,public platform: Platform,public alertController: AlertController) {
    this.height = platform.height() - 56;

    this.flag=false;
    this.platform.backButton.subscribeWithPriority(0, () => {

    })
   }

   /*
   async getLocatizacion(){
    await this._location.getPosition().subscribe(
      (pos: Position) => {
          this.coordinates = {
            latitude:  +(pos.coords.latitude),
            longitude: +(pos.coords.longitude)
          };
      });
    //  await console.log(JSON.stringify(this.coordinates))
   }*///

   back(){
     if (this.show=="lista") {
      this.router.navigate(['/plataforma',{"plataformaID":this.plataformaID,"usuario":this.usuario,"whoID":this.whoID,"whereID":this.whereID}]);
    }else
     if (this.show=="hallazgo") {
      this.show="lista";
     }

   }

  ngOnInit() {
      this.hacerPing();
      this.route.params.subscribe(params => {
      this.plataformaID = params['plataformaID'];
      this.usuario = params['usuario'];
      this.whereID = params['whereID'];
      this.whoID = params['whoID'];
      this.permiso = params['permiso'];
  });
      this.show = 'lista';
  }

    ngOnChange() {
    }
    
    ionViewDidEnter() {
    }



   itemHallasgo(id:number):void{
    this.parentID=id;
    this.show="hallazgo";
    this.banderaEditLocal=false;
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
      this.router.navigate([`/${menu}`,{"usuario":this.usuario,"plataformaID":this.plataformaID,"whereID":this.whereID, "whoID":this.whoID, "permiso":this.permiso}]);
  
    }


hacerPing(){
  this,this.conexion=null;
  this._hallazgo.pingHttp('').then(res=>{
       if (this.conexion==null) {
        this.conexion=true;
        this._toast.presentToast('Estas conectado a red CPX','success','bottom');
        return this.conexion;
       }
   });
  setTimeout(() => {
     if (this.conexion==null) {
       this._toast.presentToastOpions('','Verifique su coneccion a red CPX','md-information-circle').then(res=>{
         this.hacerPing();
       });
       this.conexion=false;
       return this.conexion;
   }},3000);
}
  


esconderMostrar(event){
  this.banderaEditLocal=event;

}


changeView(event) {
  switch (event) {
    case 'crear-area':
      this.show = 'area';
      setTimeout(()=>{
       this.areasList.onCreate();
      },200);
      break;
    case 'mostrar-area':
        this.show = 'area';
        break;
    case 'zonaAuditada':
        this.show = 'zonaAuditada';
        break;
    case 'mostrar-evento':
        this.show = 'eventos';
        break;
    case 'crear-evento':
        this.show = 'eventos';
      setTimeout(()=>{
       this.eventosList.onCreate();
      },200);
        break;
      default:
      break;
  }
}

  showSubArea(id){
    this.show = 'subarea';
    this.areaID = id;
  }


  onRegretShow(){
  this.show = 'lista';
  }
}
