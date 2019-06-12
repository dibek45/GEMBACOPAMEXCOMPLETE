import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { EventoService } from 'src/app/shared/evento.service';
import { Evento } from 'src/app/shared/evento.model';
import { FormBuilder,Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-complete-information',
  templateUrl: './complete-information.page.html',
  styleUrls: ['./complete-information.page.scss'],
})
export class CompleteInformationPage implements OnInit {
  eventos:{}
  subAreas:{};
  areaID:number;
  tipo_evento:string;
  tipo_eventoID:number;
  subAreaID:number;
  area:string;
  todo:any = {};
  passedWhoID=null;
  passedWhereID=null;
  passedeventID=null;
  isenabled:boolean;
  accion:number;
  
  constructor(private navParams:NavParams, private popoverController:PopoverController,private _evento:EventoService) {
    this.isenabled==false;
    this.areaID=0;
    this.accion=1;
   }

  ngOnInit() {
    this.passedWhoID=this.navParams.get('whoID');
    this.passedWhereID=this.navParams.get('whereID');
    this.passedeventID=this.navParams.get('eventID');
    this.getEventos();
  }

  closePopover(){
    this.popoverController.dismiss();
  }

  getEventos(){

    this.areaID=0;
    this.subAreas={};
    /*
    this._evento.getEventos(this.passedWhoID,this.passedWhereID).subscribe((data) => { 
          this.eventos=data['areas'];
          this.isenabled=false;
        },
        ()=>{console.log( "Error ")})
      */}
 
  async get_evento(evento){
    
    this.subAreaID=null;
    this.tipo_evento=evento.name;
                this.tipo_eventoID=evento.id;
                this.areaID=evento.areaID;
                this.area=evento.name;
    await this._evento.getSubArea(evento.id)
            .subscribe(
              (data) => {
                this.subAreas = data['Responsables'];//Esto es la area corregir SP
               this.isenabled=true;
              // console.log(JSON.stringify(this.subAreas))
              },
              (error) =>console.log(JSON.stringify(error))
            )  
  }

  getArea(event:Event){
    this.subAreaID=parseInt(JSON.stringify(event));
    }
  
  submit(){
    if (this.subAreaID!=null||this.tipo_evento!=null) {
      this._evento.putEvent(this.tipo_eventoID,this.tipo_evento,this.areaID,this.area,this.subAreaID,this.passedeventID).then(res=>{
        this.accion=2;
      //  this.closePopover();
      });
      
    }else 
    console.log("Debes ingresar los datos");
     
  }


}
