import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { AddAreaComponent } from './add-area/add-area.component';

export interface area {
  nombre: string;
  id: number;
}



@Component({
  selector: 'app-areas-list',
  templateUrl: './areas-list.component.html',
  styleUrls: ['./areas-list.component.scss'],
})
export class AreasListComponent implements OnInit {

  @Input() whereID: number;
  displayedColumns: string[] = ['id', 'nombre','actions'];
  dataSource;
  areas: any;
  applyFilter;
  ELEMENT_DATA: area[];
  @Output() showSubArea = new EventEmitter();

  constructor(private _evento: EventoService, private dialog: MatDialog) { }

  ngOnInit() {
    
  }

  onSearchClear(){

  }

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
    this.showSubArea.emit(id)
  }

  onCreate(){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.data={'whereID': this.whereID};
    this.dialog.open(AddAreaComponent,dialogConfig).afterClosed().subscribe((result?: boolean) => {
      this.getDataAreas();
    });

    }
  }



//rafa lima o tomas