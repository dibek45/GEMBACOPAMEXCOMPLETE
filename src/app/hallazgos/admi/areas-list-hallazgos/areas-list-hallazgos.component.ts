import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { area } from 'src/app/pages/cinco-s/areas-list/areas-list.component';
import { EventoService } from 'src/app/shared/evento.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddAreaHallazgosComponent } from './add-area-hallazgos/add-area-hallazgos.component';
import { EditComponentValorComponent } from './edit-component-valor/edit-component-valor.component';
import { AreaService } from 'src/app/shared/area.service';
import { ToastService } from 'src/app/shared/toast.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-areas-list-hallazgos',
  templateUrl: './areas-list-hallazgos.component.html',
  styleUrls: ['./areas-list-hallazgos.component.scss'],
})
export class AreasListHallazgosComponent implements OnInit {

  @Input() whereID:number;
  displayedColumns: string[] = ['id', 'nombre','actions'];
  dataSource;
  areas: any;
  ELEMENT_DATA: area[];
  @Output() showSubArea = new EventEmitter();
  searchKey;
  constructor(public alertController: AlertController,private _toast:ToastService,private _evento:EventoService, private dialog: MatDialog, private _area:AreaService) { }

  ngOnInit() {}

  ngOnChanges() {
    this.getDataAreas();
       
  }
    
  getDataAreas(){
      this._evento.getArea(0,this.whereID).subscribe((data) => {
        this.dataSource = data['areas'];
      },
      (error) =>{
        alert(error);
      })
    }

    goToSubarea(id) {
        this.showSubArea.emit(id);
    }

    onCreate() {
       const dialogConfig= new MatDialogConfig();
       dialogConfig.disableClose=true;
       dialogConfig.autoFocus=true;
       dialogConfig.data={'whereID': this.whereID};
       this.dialog.open(AddAreaHallazgosComponent,dialogConfig).afterClosed().subscribe((result?: boolean) => {
          this.getDataAreas();
       });
    }


    onEdit(item) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      this.dialog.open(EditComponentValorComponent, dialogConfig).afterClosed().subscribe((result) => {

        if (result==undefined) {
          this._toast.presentToast("Debes ingresar un valor",'danger','bottom');
        }else{
          this._area.putAreaAdmi(item.id, result).subscribe(res => {
            this.getDataAreas();
          },
          err => {
            alert(JSON.stringify(err));
          });
        }
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
            this._area.deleteAreaAdmi(id).subscribe( res => {
              this._toast.presentToast("Area borrada",'success','bottom');

              this.getDataAreas();
            }, err => {
              console.log(JSON.stringify(err));
            });
          }
        }
      ]
    });
    await alert.present();
  }


  applyFilter(){

  }
}
