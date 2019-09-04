import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
@Component({
  selector: 'app-modal-change-area',
  templateUrl: './modal-change-area.component.html',
  styleUrls: ['./modal-change-area.component.scss'],
})
export class ModalChangeAreaComponent implements OnInit {

  eventos: any;
  area;
  form: any = {};
  subareas: Object;
  whereID: number;
  plataformaID: number;
  hallazgoID: any;
  subareaID: number;
  constructor(
    private _hallazgo: HallazgosService,
    public dialog: MatDialog, 
    public dialogRef: MatDialogRef<ModalChangeAreaComponent>,
    private _toast:ToastService,
    private formBuilder: FormBuilder,
    private _evento:EventoService,
    @Inject(MAT_DIALOG_DATA) public data
    ) {
      this.whereID=data.whereID;
      this.plataformaID=data.plataformaID; 
      this.hallazgoID=data.hallazgoID; 
 

    this.form = this.formBuilder.group({
      evento:['',Validators.required],
      subareaID:['',Validators.required]
    });
  }

  ngOnInit() {
    this.getData();
  }

  refresh(){
  
    this._evento.getEventos(1,this.whereID,this.plataformaID).subscribe(res=>{
      this.eventos=res['areas'];
    this._toast.presentToast("Areas actualizadas",'primary','top')

    },
    err=>{
      this._toast.presentToast("No esta conectado a la red CPX",'danger','top')
      console.log(JSON.stringify(err));
    });
  }
ngOnChanges(){


 
  
}

getarea(obj:any){
  alert("busca subareas"+JSON.stringify(this.form.value.evento))
    
    this._evento.getSubArea(this.form.value.evento.areaID).subscribe((data) => {
      alert(JSON.stringify(data))
        this.subareas = data['Areas'];
      },
      (error) =>{
        alert(error);
      })
  }

  getSubarea(event){
    
    this.subareaID=event.subareaID
    alert(this.subareaID)
  }

  getData(){
    this._evento.getEventosAdmi(this.whereID,this.plataformaID).subscribe(res=>{
     this.eventos=res['Eventos'];
     //alert(JSON.stringify(res))
      //this._toast.presentToast("trae hallazgos",'danger','top');
    },
    err=>{
      this._toast.presentToast("No esta conectado a la red CPX",'danger','top')
      alert(JSON.stringify(err));
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  saveHallazgoUpdate() {
    alert(this.form.value.evento.areaID + ' ' + this.form.value.evento.id)
    this._hallazgo.puthallazgoEventoHttp(this.subareaID,this.form.value.evento.id,this.hallazgoID).subscribe(res=>{
      alert('res'+JSON.stringify(res));
    },
    err => {
      alert(JSON.stringify(err));
    });
  }
}
