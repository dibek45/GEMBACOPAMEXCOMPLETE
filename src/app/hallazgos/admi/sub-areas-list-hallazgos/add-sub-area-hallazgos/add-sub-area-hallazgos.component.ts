import { Component, OnInit, Inject } from '@angular/core';
import { SubAreaService } from 'src/app/shared/sub-area.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-sub-area-hallazgos',
  templateUrl: './add-sub-area-hallazgos.component.html',
  styleUrls: ['./add-sub-area-hallazgos.component.scss'],
})
export class AddSubAreaHallazgosComponent implements OnInit {

  subArea: string;
  areaID:number;
  constructor(private _subArea:SubAreaService,  public dialog: MatDialog, public dialogRef: MatDialogRef<AddSubAreaHallazgosComponent>,
  @Inject(MAT_DIALOG_DATA) public data){ 
        this.areaID = this.data.areaID;
        }

  ngOnInit() {}

  saveArea(){
  
    if (this.subArea==undefined) {
      alert("Ingresa todos los campos");
     
    }else{
      this._subArea.post_subArea(this.subArea,this.areaID ).subscribe(res => {
        
        this.onCancel();
         },
         err=>{
           alert(JSON.stringify(err));
         })
      
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }

}
