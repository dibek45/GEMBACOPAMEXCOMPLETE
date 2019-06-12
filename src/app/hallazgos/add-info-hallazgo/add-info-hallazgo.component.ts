import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder,private _evento:EventoService) { 

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
  },
  err=>{
    console.log(JSON.stringify(err))
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
        console.error(error);
      }
    )
  }

  getSubarea(event:Event){
    this.infoEvento.emit({"evento":this.form.value.evento.id,"area":this.form.value.evento.areaID,"subarea":this.form.value.subareaID})
  }
}
