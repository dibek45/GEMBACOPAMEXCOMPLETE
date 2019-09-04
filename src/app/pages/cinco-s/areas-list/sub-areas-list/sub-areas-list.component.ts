import { Component, OnInit, Input } from '@angular/core';
import { EventoService } from 'src/app/shared/evento.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddAreaComponent } from '../add-area/add-area.component';
import { AddSubareaComponent } from './add-subarea/add-subarea.component';

export interface subarea {
  nombre: string;
  id: number;
}


@Component({
  selector: 'app-sub-areas-list',
  templateUrl: './sub-areas-list.component.html',
  styleUrls: ['./sub-areas-list.component.scss'],
})
export class SubAreasListComponent implements OnInit {

  @Input() areaID:number;
  displayedColumns: string[] = ['id', 'nombre','actions'];
  dataSource;
  subareas: any;
  ELEMENT_DATA: subarea[];
  constructor(private _evento:EventoService, private dialog: MatDialog) { }

  ngOnInit() {}

  ngOnChanges() {
    this.getDataSubAreas();
  }


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
    this.dialog.open(AddSubareaComponent,dialogConfig).afterClosed().subscribe((result?: boolean) => {
      this.getDataSubAreas();
    });


   
  }

  onSearchClear(){}
}
