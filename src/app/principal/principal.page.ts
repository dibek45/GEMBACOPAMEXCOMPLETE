import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DiseñoService } from '../shared/diseño.service';
import { HallazgosService } from '../shared/hallazgos.service';
import { ToastService } from '../shared/toast.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  total_hallazgos:number;
  busquedaAccion={};
  usuario:String;
  relevante:boolean=true;
  location:{};
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
  searchQuery: any;
  conexion: any;

  constructor(private _toast:ToastService,private _hallazgo: HallazgosService,private _diseño:DiseñoService,private storage: Storage,private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
        this.hacerPing();
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
    this.router.navigate([`/${menu}`,{"usuario":this.usuario,"plataformaID":this.plataformaID,"whereID":this.whereID,whoID:this.whoID}]);
  }

  search(hallazgoID:number){
    this.searchQuery=parseInt(this.searchQuery);
    this._hallazgo.getHallazgoByID_api(this.searchQuery).subscribe((res)=>{
      if (res==undefined||res==null||res=="") {
        this._toast.presentToast('Hallazgo no encontrado', 'secundary','top');
      }else
      this.router.navigate(['/hallazgo-complete',{"usuario":this.usuario,"plataformaID":this.plataformaID,"whereID":this.whereID, "whoID":this.whoID,"hallazgoID":this.searchQuery}]);
},
(err)=>{
  alert(JSON.stringify(err));
})
  }

  get_total(event){
    this.total_hallazgos=event;
  }

  hacerPing(){
    this,this.conexion=null;
     this._hallazgo.pingHttp('').then(res=>{
         if (this.conexion==null) {
          this.conexion=true;
          this._toast.presentToast('Estas conectado a red CPX','success','bottom')
             return this.conexion;
         }
     });
     setTimeout(() => {
       if (this.conexion==null) {
         this._toast.presentToastOpions('','Verifique su coneccion a red CPX','md-information-circle').then(res=>{
           this.hacerPing();
         })
         this.conexion=false;
         return this.conexion;
     }},3000);
  }
}
