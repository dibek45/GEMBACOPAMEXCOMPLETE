import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import {AreasListComponent} from '../areas-list/areas-list.component'

@Component({
  selector: 'app-menu5sadmi',
  templateUrl: './menu5sadmi.component.html',
  styleUrls: ['./menu5sadmi.component.scss'],
})
export class Menu5sadmiComponent implements OnInit {
  @Output() modificarVista = new EventEmitter();
  @Input() show: string;

  constructor() { }

  ngOnInit() {}


  onShow(value) {
   this.modificarVista.emit(value);
  }


  onRegretShow() {
    switch (this.show) {
      case 'zonaAuditada':
        break;
      case 'area':
      this.modificarVista.emit('zonaAuditada');
        break;
      case 'subarea':
          this.modificarVista.emit('mostrar-area');
        break;
       case 'hoja5s':
        this.modificarVista.emit('zonaAuditada');
        break;
      default:
        break;
    }
  }
}
