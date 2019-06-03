import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() infoEvento = new EventEmitter<Object>();
  constructor(private formBuilder: FormBuilder,private _evento:EventoService) { 

    this.form = this.formBuilder.group({
      evento:['',Validators.required],
      subareaID:['',Validators.required]
    });

  }

  ngOnInit() {
    this._evento.getEventos(1,1).subscribe(res=>{
      this.eventos=res['areas']
     // alert(JSON.stringify(res))
    })
  }


  getarea(obj:any){
    this.infoEvento.emit({"area":this.form.value.areaID,"subarea":null})
    //alert(JSON.stringify(this.form.value.evento));
    this._evento.getSubArea(this.form.value.evento.areaID)
    .subscribe(
      (data) => {
        this.subareas = data['Areas'];
      //  alert(JSON.stringify(this.subareas));
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  getSubarea(event:Event){
   // alert(JSON.stringify(this.form.value.areaID+' , subarea:'+this.form.value.subareaID));
    this.infoEvento.emit({"evento":this.form.value.evento.id,"area":this.form.value.evento.areaID,"subarea":this.form.value.subareaID})
  }
}
