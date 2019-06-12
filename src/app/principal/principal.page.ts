import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DiseñoService } from '../shared/diseño.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  busquedaAccion={};
  usuario:String;
  relevante:boolean=true;
  location:{}
  plataformaID: number;
  public appPages = [
    {
      title: 'Buscar hallazgos',
      url: '/principal',
      icon: 'search'
    },
    {
      title: 'Subir hallazgos',
      url: '/hallazgos',
      icon: 'cloud-upload'
    }
  ];
  whereID: number;
  whoID: number;
  color: string;

  constructor(private _diseño:DiseñoService,private storage: Storage,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.plataformaID = +params['plataformaID'];
        this.usuario =params['usuario'];
        this.whereID =params['whereID'];
        this.whoID =params['whoID'];
        this._diseño.getColorMenu(this.plataformaID).then(res=>{
          this.color=JSON.stringify(res);
          

        })

    });
  }
  


  showBusqueda(event:Event){
    this.busquedaAccion=event;
  }

  masRelevante(event){
    this.relevante=event;
  }

  getLocation(event){
    
   this.location=event;
  }

  cerrarMapa(){
    this.location=null;
  }

  back(){
    this.router.navigate(['/plataforma',{"usuario":this.usuario,"whereID":this.whereID}]);
  }

  go(menu){
    
    if (menu=='salir') {
    this.storage.set('who', null);
    this.storage.set('where', null);
    this.storage.set('usuario', null);
    this.router.navigate(['/login',]);
    }else
    this.router.navigate([`/${menu}`,{"usuario":this.usuario,"plataformaID":this.plataformaID,"whereID":this.whereID}]);

  }
}
