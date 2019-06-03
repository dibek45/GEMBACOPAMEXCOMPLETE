import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/app/shared/toast.service';
import { ModalController, PopoverController } from '@ionic/angular';
import {CompleteInformationPage} from '../../modal/complete-information/complete-information.page'
import {MatSelectModule} from '@angular/material/select';



@Component({
  selector: 'app-list-eventos',
  templateUrl: './list-eventos.component.html',
  styleUrls: ['./list-eventos.component.scss']
})

export class ListEventosComponent implements OnInit {

  nHallazgos:number=0;
  numero:number;
  total:number;
  whoID:number;
  whereID:number;
  eventos:any;
  image_mini:string;
  hallazgos_de_evento:any[];
  imagenes:any[];
  for_hallazgo_id:number=10;
  loading:boolean;
  my_array:any[];
  subur_bandera:boolean;
  no_eventos:number
  @Output() thereIsEvent = new EventEmitter<boolean>(); 
  
  constructor(private popoverController:PopoverController ,  public modalController: ModalController,private _toast:ToastService, private storage:Storage ,private router:Router,private sqlite: SQLite, private _hallazgo:HallazgosService,private applicationRef : ApplicationRef ) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    await this.storage.get('who').then((val) => {
      this.whoID=val;

    });
    await this.storage.get('where').then((val) => {
      this.whereID=val;

    });
    this.eventos=[];
    this.no_eventos=0;
     await this._hallazgo.get_eventos(this.whoID).then(res=>{
       this.eventos=res;
      
       alert(JSON.stringify(res))
       this.eventos.forEach( (arrayItem)=> {
        this.no_eventos++;
    });
    
    if (this.no_eventos==0)
      this.thereIsEvent.emit(true);
      else
      this.thereIsEvent.emit(false);
       console.log(JSON.stringify(res)),
       err=>{alert(err)}
     })
    
  } 

  async deleteData(rowid) {
    this._hallazgo.delete_evento(rowid).then(res=>{
     //alert(res);
   })
  await this.getData();
  this._toast.presentToast('Evento eliminado','danger');
  }

  obtener_evento(id:string){
    this.router.navigate(['/hallazgos',{id:id}]);
  }

  async subFinish(ev:Event, eventID:number) {
 
    const popoverElement = await this.popoverController.create({
      component: CompleteInformationPage,
      componentProps:{
        whoID:this.whoID,
        whereID:this.whereID,
        eventID:eventID
      },
      event: event
    });
    return await popoverElement.present()
  }

}
