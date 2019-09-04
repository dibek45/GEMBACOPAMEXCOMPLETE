import { Component, OnInit, Inject } from '@angular/core';
import { AreaService } from 'src/app/shared/area.service';
import { ResponsableService } from 'src/app/shared/responsable.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-add-area-hallazgos',
  templateUrl: './add-area-hallazgos.component.html',
  styleUrls: ['./add-area-hallazgos.component.scss'],
})
export class AddAreaHallazgosComponent implements OnInit {
  responsables: any;
  selectedValue: any;
  name: any;
  whereID: number;

  constructor(private _toast:ToastService,
    private _area: AreaService,
              private _responsable: ResponsableService,
              public dialog: MatDialog, 
              public dialogRef: MatDialogRef<AddAreaHallazgosComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
                this.whereID=data.whereID;
               }

  ngOnInit() {
    this.getResponsables();
  }


  async  getResponsables() {
    await this._responsable.getResponsableAll(this.whereID).subscribe((res: any) => {
      this.responsables = res.Responsables;
    },
    err => { alert(JSON.stringify(err));
    })
  }
  
  saveArea(){
    if (this.selectedValue == undefined || this.name == undefined) {
      alert("Ingresa todos los campos");
    }else{
    let  responsableID = parseInt(this.selectedValue);
      this._area.post_area(this.name, responsableID, 1).subscribe(res => {
     this.onCancel();
      },
      err => {
        alert(JSON.stringify(err))
      })
      
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
    
}
