import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AddEventoComponent } from './add-evento/add-evento.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AlertController } from '@ionic/angular';


export interface Eventos {
  id: number;
  area: string;
  inicio:string;
  fin:string;
  comentarios:string;
  
}

@Component({
  selector: 'app-event-list-hallazgos',
  templateUrl: './event-list-hallazgos.component.html',
  styleUrls: ['./event-list-hallazgos.component.scss'],
})
export class EventListHallazgosComponent implements OnInit {
  @Input() whereID:number;
  @Input() plataformaID:number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  listData:MatTableDataSource<any>;
  displayedColumns: string[] = ['area','inicio', 'fin','comentarios','actions'];
  dataSource;
  searchKey;
  areas: any;
  ELEMENT_DATA: Eventos[];
  @Output() showSubArea = new EventEmitter();

  constructor(public alertController: AlertController,private _evento:EventoService, private dialog: MatDialog) { }

  ngOnInit() {}

  ngOnChanges() {
    this.getDataAreas();
  }

  getDataAreas(){
      this._evento.getEventosAdmi(this.whereID,this.plataformaID).subscribe((data) => {
        this.dataSource = data['Eventos'];
        this.listData=new MatTableDataSource(this.dataSource);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
      },
      (error) => {
        alert(error);
      });
    }

    goToSubarea(id) {
      
        this.showSubArea.emit(id)
    }

    onCreate() {
       const dialogConfig= new MatDialogConfig();
       dialogConfig.disableClose=true;
       dialogConfig.autoFocus=true;
       dialogConfig.data={'whereID': this.whereID};
       this.dialog.open(AddEventoComponent,dialogConfig).afterClosed().subscribe((result?: boolean) => {
         this.getDataAreas();
       });
    }

    onEdit(item) {
      const dialogConfig= new MatDialogConfig();
      dialogConfig.disableClose=true;
      dialogConfig.autoFocus=true;
      dialogConfig.data={'item':item,'whereID':this.whereID};
      this.dialog.open(EditEventComponent,dialogConfig).afterClosed().subscribe((result?: boolean) => {
        this.getDataAreas();
      });
   }
   onDelete(id){
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
            this._evento.deleteEventoAdmi(id).subscribe( res => {
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
}
