import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocationService } from '../shared/location.service';
import { AlertService } from '../shared/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map:any;
  ap:any;
  marker:any;
  latitude:any="";
  longitude:any="";
  timestamp:any="";
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  @Input() location: Object;  
  @Output() cerrar= new EventEmitter();
  title: string = 'My first AGM project';
  latMyUbi: number ;
  lngMyUbi: number ;
  
  latHallazgo: number;
  lngHallazgo: number;
  title2: string = 'My first AGM project';
  height = 20;
  hallazgoID: number;
  private sub: any;
  coordinates: { latitude: number; longitude: number; };
  usuario:string;
  constructor(private _location:LocationService,private storage: Storage,private router:Router, private route: ActivatedRoute,private _alert:AlertService, private cdr: ChangeDetectorRef,public platform:Platform){


      this.height = this.platform.height() - 56;
      this.route.params.subscribe(params => {
          this.hallazgoID = +params['hallazgoID']; // (+) converts string 'id' to a number
          this.lngMyUbi =parseFloat( params['lonUbi']);
          this.latMyUbi = parseFloat( params['latUbi']);
          this.latHallazgo = parseFloat(params['latitude']);
          this.lngHallazgo = parseFloat(params['longitude']);
    alert(  this.latHallazgo)
      });
     
  }
  ngOnChanges(){
   
  }

  ngOnInit() {

    
   this.cargar_usuario();
  }
  
  ngOnDestroy(){
  
  }


  getEnd(event){
    alert(JSON.stringify(event))
  }

  async markerClick(a){
    
  }

  metodo(hallazgoID:number){
    
    this.router.navigate(['/hallazgo-complete',{"hallazgoID":hallazgoID}]);

  }

  cargar_usuario() {
    this.storage.get('usuario').then((val) => {
      this.usuario=val;
    });
  }
  
}
