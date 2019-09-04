import { Component, OnInit, Inject } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import { SubAreaService } from 'src/app/shared/sub-area.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';
import { area } from 'src/app/pages/cinco-s/areas-list/areas-list.component';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  areas: area[];
  whereID: any;
  inicio: any;
  fin: any;
  areaID: number;
  comentarios: any='';
  id: any;

constructor(private _evento:EventoService, private _subArea:SubAreaService,  public dialog: MatDialog, 
    public dialogRef: MatDialogRef<EditEventComponent>, @Inject(MAT_DIALOG_DATA) data){
      this.areaID = data.item.areaID
      this.inicio = data.item.inicio;
      this.fin = data.item.fin;
      this.comentarios = data.item.comentarios;
      this.whereID = data.whereID;
      this.id=data.item.id;
   
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
  //  alert(JSON.stringify(this.areas));
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
      this._evento.putEventoAdmi(this.areaID, inicio, fin, this.comentarios,this.id).subscribe(res => {
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
