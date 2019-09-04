import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popover/popover/popover.component';
import { LugarTrabajo } from 'src/app/shared/5s/lugar-trabajo.model';
import { ActivatedRoute } from '@angular/router';
import { AreasListComponent } from './areas-list/areas-list.component';

@Component({
  selector: 'app-cinco-s',
  templateUrl: './cinco-s.page.html',
  styleUrls: ['./cinco-s.page.scss'],
})
export class CincoSPage implements OnInit {
  @ViewChild(AreasListComponent) hijo: AreasListComponent;
  show: string;
  lugar: LugarTrabajo;
  usuario: any;
  whereID: number;
  whoID: number;
  areaID: any;
  constructor(public popoverController: PopoverController,public alertController: AlertController,private route: ActivatedRoute) { }

  ngOnInit() {
    this.show = 'zonaAuditada';
    
        this.route.params.subscribe(params => {
        this.usuario = params['usuario'];
        this.whereID = params['whereID'];
        this.whoID = params['whoID'];
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      subHeader: 'Tienes un total de 5 hallazgos dentro de',
      message: 'Se tiene en el escritorio y/o sala fotografia de la referencia actualizada de 5 <ion-icon name="folder"></ion-icon>',
      buttons: ['Cancelar', 'Aceptar']
    });

    await alert.present();
  }


  irEvidencia() {
    this.show = 'detalle';
  }


  goToQuestions(event) {

    this.lugar = event;
    this.show = 'hoja5s';
  }


  changeView(event) {
    switch (event) {
      case 'crear-area':
        this.show = 'area';
        setTimeout(()=>{
         this.hijo.onCreate();
        },200);
        break;
      case 'mostrar-area':
          this.show = 'area';
          break;
      case 'zonaAuditada':
          this.show = 'zonaAuditada';
          break;
        default:
        break;
    }
  }


  showSubArea(id){
    this.show = 'subarea';
    this.areaID=id;
  }
}
