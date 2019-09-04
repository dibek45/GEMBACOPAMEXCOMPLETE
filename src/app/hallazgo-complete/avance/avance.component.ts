import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HallazgosService } from 'src/app/shared/hallazgos.service';

@Component({
  selector: 'app-avance',
  templateUrl: './avance.component.html',
  styleUrls: ['./avance.component.scss'],
})
export class AvanceComponent implements OnInit {
  @Input() hallazgoID:number;
  @Input() avanceID:number;
  @Input() permiso:number;
  @Output() updateStatus = new EventEmitter<number>();



  items=[   {id:1,name:'Abierto',  icon:'ios-folder-open'},
            {id:2,name:'Proceso',  icon:'ios-swap'}, 
            {id:3,name:'Terminado',icon:'ios-checkmark'}, 
            {id:4,name:'Cerrado',  icon:'ios-checkmark-circle'},
            {id:5,name:'Duplicado',icon:'copy'}, 
            {id:6,name:'Cancelado',icon:'close-circle'}]

  constructor(private _hallazgo:HallazgosService) { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

    changeStatus(item: number ) {

      if (this.permiso === 1) {
        this._hallazgo.putStateHallazgoHttp(this.hallazgoID, item).subscribe(res => {
       this.updateStatus.emit(item);
        }, err => {
          alert(JSON.stringify(err));
        });
      }
    }
}
