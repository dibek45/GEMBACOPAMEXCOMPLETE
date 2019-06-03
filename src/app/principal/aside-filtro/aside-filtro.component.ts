import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import { NavParams } from '@ionic/angular';
import { ResponsableService } from 'src/app/shared/responsable.service';
import {Responsable} from '../../shared/responsable.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-aside-filtro',
  templateUrl: './aside-filtro.component.html',
  styleUrls: ['./aside-filtro.component.scss'],
})
export class AsideFiltroComponent implements OnInit {
  
  @Output() boxBusqueda = new EventEmitter();
  @Output() masRelevanteFilter = new EventEmitter();
  busquedaAccion=new Array();
  masRevelante:boolean;
 
    busqueda={
                     orden:[
                              {id:1,nombre:'Mas reciente'},
                              {id:2,nombre:'Menos reciente'}
                            ],
                    avance:[{id:1,nombre:'Abierto',tipo:2},
                            {id:2,nombre:'En proceso',tipo:2},
                            {id:3,nombre:'Terminado',tipo:2},
                            {id:4,nombre:'Cerrado',tipo:2}
                           ],
                   
                      tipo:[{id:1,nombre:'Accion',tipo:4},
                            {id:2,nombre:'Inversion',tipo:4}
                          ],
                       ano:[{id:2018,nombre:'2018',tipo:5},
                            {id:2017,nombre:'2017',tipo:5}
                           ],
                      tipo_hallazgo:[
                        {id:1,nombre:'1ra Selección',tipo:6},
                        {id:2,nombre:'2da Orden',tipo:6},
                        {id:3,nombre:'3ra Limpieza',tipo:6},
                        {id:4,nombre:'Mejora',tipo:6},
                        {id:5,nombre:'Reparación',tipo:6},
                        {id:5,nombre:'Seguridad',tipo:6},
                        {id:6,nombre:'4a Estandarización',tipo:6},
                        {id:7,nombre:'Capacitación',tipo:6},
                        {id:8,nombre:'Fuga prioridad alta',tipo:6},
                        {id:9,nombre:'Fuga prioridad baja',tipo:6},

                         ],
                  }
                  areaIsSelected:boolean;
                  avanceIsSelected:boolean;
                  responsableIsSelected:boolean;
                  tipoIsSelected:boolean;
                  anoIsSelected:boolean;
                  tipoHallazgoIsSelected:boolean;
                  
                  areaID: number;
                  subAreas: {};
                  eventos:{};
                  responsables=new Array<Responsable>();
                  isenabled: boolean;
                  passedWhoID: any;
                  passedeventID: any;


  constructor(private geolocation: Geolocation,private _evento:EventoService, private _responsable:ResponsableService) {
    this.masRevelante=true;
    this.geolocation.getCurrentPosition().then((resp) => {
      alert(resp.coords.latitude)
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
   }

  ngOnInit() {
    this.getEventos();
    this.getResponsables();
 
  }

 async  add_filter(item:Object,i,type:number){
    if(type==1)this.areaIsSelected=true;
    if(type==2)this.avanceIsSelected=true;
    if(type==3)this.responsableIsSelected=true;
    if(type==4)this.tipoIsSelected=true;
    if(type==5)this.anoIsSelected=true;
    if(type==6)this.tipoHallazgoIsSelected=true;

    let segundoArray
    await this.busquedaAccion.push(item);

    
    segundoArray=this.busquedaAccion;
   // alert(JSON.stringify(this.busquedaAccion))
    segundoArray = Object.assign({}, segundoArray);
    //alert(JSON.stringify(segundoArray))
    await this.boxBusqueda.emit(segundoArray);
  
  }

  async delete_filter(item){
      if(item==1)
        this.areaIsSelected=null;

      if(item==2)
        this.avanceIsSelected=null;

      if(item==3)
        this.responsableIsSelected=null;

      if(item==4)
        this.tipoIsSelected=null;

      if(item==5)
        this.anoIsSelected=null;

      if(item==6)
        this.tipoHallazgoIsSelected=null;

      let segundoArray=new Array();
    await  this.busquedaAccion.forEach(obj => {
        if(obj.tipo==item){
         // alert("se iguala obj.item:"+JSON.stringify(obj)+" pasado de metodo:"+item);
        }else{
          segundoArray.push(obj);
        }
      });
      //alert(this.masRevelante)
     
      this.busquedaAccion=segundoArray;
      this.boxBusqueda.emit(this.busquedaAccion);

  }

  getEventos(){
    this.areaID=0;
    this.subAreas={};
    this._evento.getEventos(1,1).subscribe((data) => { 
          this.eventos=data['areas'];
        //  alert(JSON.stringify(this.eventos))
          this.isenabled=false;
        },
        ()=>{alert( "Error ")})
  }

  getResponsables(){
    this._responsable.getResponsables(1).subscribe((res:any)=>{
  
      this.responsables=res.Responsables;
     // alert(JSON.stringify(this.responsables));
    },
    err=>{alert(JSON.stringify(err))})
  }


  change() {
  this.masRevelante=!this.masRevelante;
  this.masRelevanteFilter.emit(this.masRevelante);
}
}