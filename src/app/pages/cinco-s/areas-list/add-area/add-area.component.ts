import { Component, OnInit, Inject } from '@angular/core';
import { ResponsableService } from 'src/app/shared/responsable.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {MatDialogRef} from '@angular/material';
import { AreaService } from 'src/app/shared/area.service';
export interface responsable {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss'],
})
export class AddAreaComponent implements OnInit {
  selectedValue: string;
  selectedCar: string;
 
  responsables: responsable[];
  responsable: any;
  name: any;
  whereID: number;
  constructor( private _area:AreaService, private _responsable: ResponsableService,public dialog: MatDialog, public dialogRef: MatDialogRef<AddAreaComponent>,@Inject(MAT_DIALOG_DATA) public data) {
    this.whereID=data.whereID;
   }

  ngOnInit() {
    this.getResponsables();
  }

  
 async  getResponsables(){
  await this._responsable.getResponsableAll(this.whereID).subscribe((res:any)=>{

    this.responsables=res.Responsables;

  },
  err=>{console.log(JSON.stringify(err))})
}

saveArea(){
  if (this.selectedValue==undefined || this.name==undefined) {
    alert("Ingresa todos los campos");
   
  }else{
  let  responsableID=parseInt(this.selectedValue);
  alert("Entra")
    this._area.post_area(this.name,responsableID,1).subscribe(res=>{
   alert("se insertan")
   this.onCancel()
    },
    err=>{
      alert(JSON.stringify(err))
    })
    
  }
}

onCancel(): void {
  this.dialogRef.close();
}
  
}
