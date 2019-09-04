import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SubAreaService } from 'src/app/shared/sub-area.service';
import { EventoService } from 'src/app/shared/evento.service';
import { area } from 'src/app/pages/cinco-s/areas-list/areas-list.component';

export interface EventosSelected {
  id: number;
  areaID: number;
  inicio:string;
  fin:string;
  comentarios:string;
}
@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
})
export class AddEventoComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  areas: area[];
  whereID: any;
  inicio: any;
  fin: any;
  areaID: number;
  comentarios: any='';
  constructor(private _evento:EventoService, private _subArea:SubAreaService,  public dialog: MatDialog, 
    public dialogRef: MatDialogRef<AddEventoComponent>,@Inject(MAT_DIALOG_DATA) public data) {
      this.whereID = this.data.whereID;
     }

  ngOnInit() {
    this.getDataAreas();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getDataAreas() {
    this._evento.getArea(0, this.whereID).subscribe((data) => {
      this.areas = data['areas'];
    },
    (error) => {
      alert(error);
    });
  }

  saveEvent(){
    let inicio=this.convert(this.inicio);
    let fin=this.convert(this.fin);
    if (this.areaID==null|| inicio=='NaN-aN-aN' || fin=='NaN-aN-aN') {
      alert("Debes completar los datos");
    }else{
      this._evento.postEventoAdmi(this.areaID, inicio, fin, this.comentarios).subscribe( res => {
        this.onCancel();
      }, err => {
        alert(JSON.stringify(err));
      });
    }
  }

   convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  
}
