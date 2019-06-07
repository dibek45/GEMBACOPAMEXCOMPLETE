import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';


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

  constructor(private storage: Storage,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.plataformaID = +params['plataformaID']; // (+) converts string 'id' to a number
        this.usuario =params['usuario'];
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
    this.router.navigate(['/plataforma',{"usuario":this.usuario}]);
  }

  go(menu){
    
    if (menu=='salir') {
      this.storage.set('who', null);
    this.storage.set('where', null);
    this.router.navigate(['/login',]);
    }else
    this.router.navigate([`/${menu}`,{"usuario":this.usuario,plataformaID:this.plataformaID}]);

  }
}
