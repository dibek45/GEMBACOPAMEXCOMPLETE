import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-hallazgos',
  templateUrl: './menu-hallazgos.component.html',
  styleUrls: ['./menu-hallazgos.component.scss'],
})
export class MenuHallazgosComponent implements OnInit {
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
