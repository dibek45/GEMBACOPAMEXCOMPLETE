import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertService } from 'src/app/shared/alert.service';
import { LugarTrabajoService } from 'src/app/shared/5s/lugar-trabajo.service';
import { LugarTrabajo } from 'src/app/shared/5s/lugar-trabajo.model';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { QuestionService } from 'src/app/shared/5s/question.service';
import { keyframes, animate, stagger, query, transition, trigger, style } from '@angular/animations';

export interface lugarTrabajo {
  lugarTrabajoID: number;
  lugarTrabajo: string;
  fecha:string;
  tipoAuditoria:number;
  calificacion:number;
  hallazgos:number
}

@Component({
  selector: 'app-zona-auditada',
  templateUrl: './zona-auditada.component.html',
  styleUrls: ['./zona-auditada.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(200, [
            animate('1s ease-in', keyframes([
              style({ opacity: 0, transform: 'translateX(-79%)', offset: 0 }),
              style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
            ]))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(200, [
            animate('1s ease-in', keyframes([
              style({ opacity: 0, transform: 'translateX(-75%)', offset: 0 }),
              style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
              style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
            ]))
          ])
        ], { optional: true })
      ])
    ])
  ],
})



export class ZonaAuditadaComponent implements OnInit {

  @Output() lugar = new EventEmitter<LugarTrabajo>();
  logAnimation;
  usuario: any;
  whereID: any;
  whoID: any;
  lugares = new Array<LugarTrabajo>();
  permiso:number;

  constructor(private _questions: QuestionService, private _toast: ToastService, private _alert: AlertService, private _lugarTrabajo: LugarTrabajoService, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
    this.usuario = params['usuario'];
    this.whereID = params['whereID'];
    this.whoID = params['whoID'];
    this.permiso = params['permiso'];
    //alert(this.permiso);
});
  }

  ngOnInit() {
    this.getLugares();
  }

  async getLugares() {
    this.lugares = [];
    await  this._lugarTrabajo.getLugarTrabajo(this.whoID).then((res: []) => {
      this.lugares = res;
      alert(JSON.stringify(this.lugares));
    },
    (err) => {
      alert(JSON.stringify(err));
    });
  }

  goToQuestions(lugar) {
    this.lugar.emit(lugar);
  }

  addLugarTrabajo() {

   this._alert.alert_input('Lugar de trabajo', 'lugarTrabajo', '...').then(res => {
     this._alert.AlertRadio('Tipo de auditoria', '5S', 'Auditoria 5s', '3S', 'Auditoria 3s').then(auditoria => {
      let lugarTrabajo = new LugarTrabajo();
      const  myDate: String = new Date().toISOString();
      lugarTrabajo.lugarTrabajo = res['lugarTrabajo'];
      lugarTrabajo.fecha = myDate;
      lugarTrabajo.observadorID = this.whoID;
      lugarTrabajo.tipoAuditoria = parseInt(JSON.stringify(auditoria));
      this._lugarTrabajo.postLugarTrabajo(lugarTrabajo).then((res2: {insertId: Number} )=> {
        this._questions.makeQuestionsFromLugar(res2.insertId).then(() => {
          this._toast.presentToast('Lugar de trabajo agregado', 'success', 'bottom');
          this.getLugares();
        }, err => {
          alert(JSON.stringify(err));
        });
      },
      err => {
       alert(JSON.stringify(err));
      });
    },
    err => {
      alert(JSON.stringify(err));
    });

   });
  }

  deleteHallazgo(id) {
    this._lugarTrabajo.delete_hallazgo(id).then((res) => {
      this._toast.presentToast('Lugar de trabajo Eliminado', 'success', 'bottom');
      this.getLugares();
    }, (err) => {

    });
  }
}
