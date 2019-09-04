import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-plataforma',
  templateUrl: './plataforma.page.html',
  styleUrls: ['./plataforma.page.scss'],
})
export class PlataformaPage implements OnInit {
  usuario: string;
  whereID: number;
  whoID: number;
  tertiary: string;

  constructor(private storage: Storage, private router: Router, private route: ActivatedRoute, private _usuario: UsuarioService) { }

  ngOnInit() {
        this.tertiary = "tertiary";
        this.route.params.subscribe(params => {
        this.usuario = params['usuario'];
        this.whereID = params['whereID'];
        this.whoID = params['whoID'];
    });
  }

  openPreview(plataformaID){
    let permiso = 0;

    this._usuario.getPermisoPlataforma(this.whoID, plataformaID).then((res: { plataformaID: number}) => {
     
    if (res[0].plataformaID)permiso = 1;
    
    if (plataformaID == 2) {
        this.router.navigate(['/cinco-s/', {"plataformaID": plataformaID, "usuario": this.usuario, "whereID": this.whereID, 'whoID' : this.whoID,'permiso':permiso}]);
      }else{
        this.router.navigate(['/hallazgos/', {"plataformaID": plataformaID, "usuario": this.usuario, "whereID": this.whereID, 'whoID': this.whoID,'permiso':permiso}]);
      }
    }, err => {
      this.router.navigate(['/hallazgos/', {"plataformaID": plataformaID, "usuario": this.usuario, "whereID": this.whereID, 'whoID': this.whoID,'permiso':permiso}]);

      console.log(JSON.stringify(err));
    });
  }

  go(menu){
    if (menu = 'salir') {
      this.storage.set('who', null);
      this.storage.set('where', null);
      this.router.navigate(['/login', ]);
    }
  }
}