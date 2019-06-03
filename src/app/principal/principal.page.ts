import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  busquedaAccion={};
  usuario:String;
  relevante:boolean;
  location:{}


  constructor(private storage: Storage) { }

  ngOnInit() {
    this.cargar_usuario();
  }
  
  cargar_usuario() {
    this.storage.get('usuario').then((val) => {
      this.usuario=val;
    });
  }

  showBusqueda(event:Event){
  //  alert(JSON.stringify(event))
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
}
