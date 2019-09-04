import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {}


  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Informacion',
      subHeader: 'Tienes un total de 5 hallazgos dentro de',
      message: 'Se tiene en el escritorio y/o sala fotografia de la referencia actualizada de 5 <ion-icon name="folder"></ion-icon>',
      buttons: ['Cancel', 'Camara', 'Galeria']
    });

    await alert.present();
  }
}
