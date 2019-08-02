import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-add-info-hallazgo',
  templateUrl: './add-info-hallazgo.component.html',
  styleUrls: ['./add-info-hallazgo.component.scss'],
})
export class AddInfoHallazgoComponent implements OnInit {

  eventos:any;
  area;
  form:any = {};
  subareas: Object;
  @Input() plataformaID:number;
  @Input() whereID:number;
  @Input() whoID:number;

  @Output() infoEvento = new EventEmitter<Object>();
  constructor(
    private _toast:ToastService,
    private formBuilder: FormBuilder,
    private _evento:EventoService
    ) { 

    this.form = this.formBuilder.group({
      evento:['',Validators.required],
      subareaID:['',Validators.required]
    });
  }

  ngOnInit() {
  }

ngOnChanges(){

  this._evento.getEventos(1,this.whereID,this.plataformaID).subscribe(res=>{
    this.eventos=res['areas'];
   // console.log(JSON.stringify(res));
    //this._toast.presentToast("trae hallazgos",'danger','top')

    
  },
  err=>{
    this._toast.presentToast("No esta conectado a la red CPX",'danger','top')
    console.log(JSON.stringify(err));
  });
}

getarea(obj:any){
    this.infoEvento.emit({"area":this.form.value.areaID,"subarea":null})
    this._evento.getSubArea(this.form.value.evento.areaID)
    .subscribe(
      (data) => {
        this.subareas = data['Areas'];
       
      },
      (error) =>{
        alert(error);
      }
    )
  }

  getSubarea(event:Event){
    this.infoEvento.emit({"evento":this.form.value.evento.id,"area":this.form.value.evento.areaID,"subarea":this.form.value.subareaID})
  }
}
