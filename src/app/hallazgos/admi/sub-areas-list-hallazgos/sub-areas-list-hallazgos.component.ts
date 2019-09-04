import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EventoService } from 'src/app/shared/evento.service';
import { AddSubAreaHallazgosComponent } from './add-sub-area-hallazgos/add-sub-area-hallazgos.component';
import { AlertController } from '@ionic/angular';
import { SubAreaService } from 'src/app/shared/sub-area.service';
import { EditComponentValorComponent } from '../areas-list-hallazgos/edit-component-valor/edit-component-valor.component';
import { ToastService } from 'src/app/shared/toast.service';

export interface subarea {
  nombre: string;
  id: number;
}

@Component({
  selector: 'app-sub-areas-list-hallazgos',
  templateUrl: './sub-areas-list-hallazgos.component.html',
  styleUrls: ['./sub-areas-list-hallazgos.component.scss'],
})
export class SubAreasListHallazgosComponent implements OnInit {
  @Input() areaID:number;
  displayedColumns: string[] = ['id', 'nombre','actions'];
  dataSource;
  subareas: any;
  ELEMENT_DATA: subarea[];
  searchKey;

  constructor(private _toast:ToastService, private _subArea:SubAreaService,  public alertController: AlertController,private _evento:EventoService, private dialog: MatDialog) { }

  ngOnInit() {}

  ngOnChanges() {
    this.getDataSubAreas();
  }

  applyFilter(){}
  getDataSubAreas(){
    this._evento.getSubArea(this.areaID).subscribe((data) => {
      this.dataSource = data['Areas'];
    },
    (error) =>{
      alert(error);
    });
  }


  onCreate(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.data={'areaID': this.areaID};
    this.dialog.open(AddSubAreaHallazgosComponent,dialogConfig).afterClosed().subscribe((result?: boolean) => {
      this.getDataSubAreas();
    });
  }

  onDelete(id) {
    this.confirmarBorrar(id);
   }


   async confirmarBorrar(id) {
    const alert = await this.alertController.create({
      header: 'En verdad deseas borrar',
      message: 'Los cambios seran permanentes!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Borrar',
          handler: () => {
            this._subArea.deleteSubAreaAdmi(id).subscribe( res => {
              this._toast.presentToast("Sub area borrada",'success','bottom');

              this.getDataSubAreas();
            }, err => {
              console.log(JSON.stringify(err));
            });
          }
        }
      ]
    });
    await alert.present();
  }


  onEdit(item) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(EditComponentValorComponent, dialogConfig).afterClosed().subscribe((result) => {

      if (result==undefined) {
        this._toast.presentToast("Debes ingresar un valor",'danger','bottom');
      }else{
        this._subArea.putSubAreaAdmi(item.id, result).subscribe(res => {
          this.getDataSubAreas();
        },
        err => {
          alert(JSON.stringify(err));
        });
      }
    });
 }
}
