import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, } from '@angular/core';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
import {Hallazgo} from '../../shared/hallazgo.model'
import { Router } from '@angular/router';
//import { LocationService } from 'src/app/shared/location2.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
@Input() busqueda=[];
@Input() relevante:boolean;
@Input() plataformaID:number;
@Input() usuario:string;
@Input() whereID:number;
@Input() whoID:number;
@Input() permiso:number;
p;

@Output() location= new EventEmitter();
@Output() total_hallazgos= new EventEmitter();
hallazgos;
coordinates: { latitude: number; longitude: number; };
  
  constructor(private storage:Storage,private _toast:ToastService,
    //private _location:LocationService, 
    private router:Router,private _hallazgo:HallazgosService) { 
    this.hallazgos=new Array<Hallazgo>();
    
  }

  ngOnInit() {
  //  this.get_hallazgos(null,null,null,null,null,null,1,1);
  }

  async get_hallazgos(areaID:number,avanceID:number,responsableID:number,tipoID:number,ano:number,tipoHallazgo:number,empresaID:number,relevante,plataformaID:number,subarea:number,mes:number){
    await this._hallazgo.getHallazgos_api(areaID,avanceID,responsableID,tipoID,ano,tipoHallazgo,this.whereID,relevante,this.plataformaID,subarea,mes).subscribe((res)=>{
      this.hallazgos=res['hallazgos'];
      this.total_hallazgos.emit(JSON.stringify(res['total']));
  
    },
    (err)=>{
      console.log(JSON.stringify(err))
    })
  }


  ngOnChanges(changes: SimpleChanges) {
   // console.log(this.relevante)
    let reciente=1;
    if (!this.relevante) {
      reciente=1;
    }else
    reciente=0;
  //  this.getLocatizacion();
      let variables=[null,null,null,null,null,null,null,null,null];
      for(var i in this.busqueda){
        variables[this.busqueda[i].tipo]=this.busqueda[i].id;
      }
     
        this.get_hallazgos(variables[1],variables[2],variables[3],variables[4],variables[5],variables[6],this.whereID,reciente,this.plataformaID,variables[7],variables[8]);
  }
 

  async obtenerMapa(hallazgo:any) {
  //  await this.getLocatizacion();
    if (this.coordinates) {
      await this.router.navigate(['/map',{"hallazgoID":hallazgo.hallazgoID,"latitude":hallazgo.latitude,"longitude":hallazgo.longitude,"latUbi":this.coordinates.latitude,"lonUbi":this.coordinates.longitude,"plataformaID":this.plataformaID,"usuario":this.usuario, "whereID":this.whereID,"whoID":this.whoID}]);
    }else
    await this._toast.presentToast("No fue posible obtener la localizacion intente nuevamente",'warning','bottom');
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
      if (this.coordinates) {
        console.log(JSON.stringify(this.coordinates))
      }
   }
   */

   async obtenerHallazgo(hallazgo:any) {
    this.router.navigate(['/hallazgo-complete',{"usuario":this.usuario,"plataformaID":this.plataformaID,"whereID":this.whereID, "whoID":this.whoID,"hallazgoID":hallazgo.hallazgoID,"permiso":this.permiso}]);
  }

  
}
