import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import { NavParams } from '@ionic/angular';
import { ResponsableService } from 'src/app/shared/responsable.service';
import {Responsable} from '../../shared/responsable.model';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-aside-filtro',
  templateUrl: './aside-filtro.component.html',
  styleUrls: ['./aside-filtro.component.scss'],
})
export class AsideFiltroComponent implements OnInit {
   
  @Output() boxBusqueda = new EventEmitter();
  @Output() masRelevanteFilter = new EventEmitter();
  @Input() total_hallazgos:number;

  filtroFlag=true;
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
                       ano:[{id:2019,nombre:'2019',tipo:5},
                            {id:2018,nombre:'2018',tipo:5},
                            {id:2017,nombre:'2017',tipo:5}
                           ],
                      tipo_hallazgo:[
                        {id:1,nombre:'1ra Selección',tipo:6},
                        {id:2,nombre:'2da Orden',tipo:6},
                        {id:3,nombre:'3ra Limpieza',tipo:6},
                        {id:4,nombre:'Mejora',tipo:6},
                        {id:5,nombre:'Reparación',tipo:6},
                        {id:6,nombre:'Seguridad',tipo:6},
                        {id:7,nombre:'4a Estandarización',tipo:6},
                        {id:8,nombre:'Capacitación',tipo:6},
                        {id:9,nombre:'Fuga prioridad alta',tipo:6},
                        {id:10,nombre:'Fuga prioridad baja',tipo:6},

                         ],
                         mes:[
                          {id:1,nombre:'Enero ',tipo:8},
                          {id:2,nombre:'Febrero',tipo:8},
                          {id:3,nombre:'Marzo',tipo:8},
                          {id:4,nombre:'Abril',tipo:8},
                          {id:5,nombre:'Mayo',tipo:8},
                          {id:6,nombre:'Junio',tipo:8},
                          {id:7,nombre:'Julio',tipo:8},
                          {id:8,nombre:'Agosto',tipo:8},
                          {id:9,nombre:'Septiembre',tipo:8},
                          {id:10,nombre:'Octubre',tipo:8},
                          {id:11,nombre:'Noviembre',tipo:8},
                          {id:12,nombre:'Diciembre',tipo:8}
                           ],
                  }
                  areaIsSelected:boolean;
                  mesIsSelected:boolean;
                  subAreaIsSelected:boolean;
                  avanceIsSelected:boolean;
                  responsableIsSelected:boolean;
                  tipoIsSelected:boolean;
                  anoIsSelected:boolean;
                  tipoHallazgoIsSelected:boolean;
                  
                  areaID: number;
                  subAreas=new Array();
                  eventos:{};
                  responsables=new Array<Responsable>();
                  isenabled: boolean;
                  passedWhoID: any;
                  passedeventID: any;
                  whoID: any;
                  whereID: any;
                  form: any;
  area: any;
  mes: any;
  subArea:any;
  avance: any;
  responsable: any;
  tipo: any;
  ano: any;

  constructor(private storage:Storage,private formBuilder: FormBuilder,
   // private geolocation: Geolocation,
    private _evento:EventoService, private _responsable:ResponsableService) {
      this.form = this.formBuilder.group({
        area:[],
        subArea:[],
        avance:[],
        responsable:[],
        tipo:[],
        tipo_imp:[],
        ano:[],
        mes:[]
      });
    
    this.masRevelante=true;
    /*this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });*/
   }

   ngOnInit() {
    this.getData();
  }

 async  add_filter(item:{id:number},i,type:number){

  switch (type) {
    case 1:
        item=this.form.value['area']; 
        this._evento.getSubArea(item.id)
    .subscribe(
      (data) => {
        this.subAreas = data['Areas'];
      },
      (error) =>{
        alert(error);
      }
    )
      break;
    case 2:
        item=this.form.value['avance'];
      break
    case 3:
        item=this.form.value['responsable'];
      break
    case 4:
        item=this.form.value['tipo_imp'];
      break  
    case 5:
        item=this.form.value['ano'];
              break;
    case 6:
        
        item=this.form.value['tipo'];
        break; 
    case 7:
        item=this.form.value['subArea'];
            break; 
    case 8:
        item=this.form.value['mes'];
            break; 
  }

this.esconderFiltro(type,item);
  }

  esconderFiltro(type,item){
    if(type==1){
      this.areaIsSelected=true;
      this.area=null;
    }
    if(type==2){
      this.avanceIsSelected=true;
      this.avance=null;
    }
    if(type==3){
      this.responsableIsSelected=true;
      this.responsable=null;
    }
    if(type==4){
      this.tipoIsSelected=true;
      
      }
    if(type==5){
      this.anoIsSelected=true;
      this.ano=null;
    }
    if(type==6){this.tipoHallazgoIsSelected=true;
    this.tipo=null;
    }
    if(type==7){
      this.subAreaIsSelected=true;
      this.subArea=null;
    }
    if(type==8){
      this.mesIsSelected=true;
    }

    let segundoArray
     this.busquedaAccion.push(item);

    segundoArray=this.busquedaAccion;
    segundoArray = Object.assign({}, segundoArray);
     this.boxBusqueda.emit(segundoArray);
  
  }
  async delete_filter(item){
   // console.log("este es item:"+item)
      if(item==1){
        this.areaIsSelected=null;
        this.subAreaIsSelected=null;
      }
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
      if(item==7)
        this.subAreaIsSelected=null;
      if(item==8)
        this.mesIsSelected=null;

      let segundoArray=new Array();
      let siete:boolean;
    await  this.busquedaAccion.forEach(obj=> {
        let borrar =false
       
        if(obj.tipo==item || (item==1 && obj.tipo==7)){
         
          siete=true;
        }else{
          segundoArray.push(obj);
        }
      });
      this.busquedaAccion=segundoArray;
      this.boxBusqueda.emit(this.busquedaAccion);

  }


  getData(){
    this.storage.get('who').then((val) => {
      this.whoID=val;
    });
     this.storage.get('where').then((val) => {
      this.whereID=val;
       this.getArea(this.whereID);
       this.getResponsables(this.whereID);
 
    });
  }
 async  getArea(where){

    this.areaID=0;
 
    await this._evento.getArea
    (1,where).subscribe((data) => { 
          this.eventos=data['areas'];
    //    console.log(JSON.stringify(this.eventos))
          this.isenabled=false;
        },
        ()=>{console.log( "Error ")})
  }

 async  getResponsables(where){
  

    await this._responsable.getResponsables(where).subscribe((res:any)=>{
  
      this.responsables=res.Responsables;
     // console.log(JSON.stringify(this.responsables));
    },
    err=>{console.log(JSON.stringify(err))})
  }


  change() {
  this.masRevelante=!this.masRevelante;
  this.masRelevanteFilter.emit(this.masRevelante);
}
changeFlag(){
  this.filtroFlag=!this.filtroFlag
}
}