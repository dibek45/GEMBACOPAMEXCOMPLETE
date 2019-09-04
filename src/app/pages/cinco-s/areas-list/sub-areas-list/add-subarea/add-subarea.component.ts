import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SubAreaService } from 'src/app/shared/sub-area.service';

@Component({
  selector: 'app-add-subarea',
  templateUrl: './add-subarea.component.html',
  styleUrls: ['./add-subarea.component.scss'],
})
export class AddSubareaComponent implements OnInit {
  subArea: string;
  areaID:number;
  constructor(private _subArea:SubAreaService,  public dialog: MatDialog, public dialogRef: MatDialogRef<AddSubareaComponent>,
  @Inject(MAT_DIALOG_DATA) public data){ 
        this.areaID = this.data.areaID;
        }

  ngOnInit() {}


  saveArea() {
    if (this.subArea == undefined) {
      alert('Ingresa todos los campos');
    } else {

      this._subArea.post_subArea(this.subArea, this.areaID ).subscribe(res => {
        alert('se insertan');
        this.onCancel();
         },
         err => {
           alert(JSON.stringify(err));
         });
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
