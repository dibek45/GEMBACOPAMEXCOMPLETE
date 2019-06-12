import { Component, OnInit, Input, Output, EventEmitter, ApplicationRef, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
import { Storage } from '@ionic/storage';
import { PopoverController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast.service';
import { ImagenesService } from 'src/app/shared/imagenes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-hallazgo',
  templateUrl: './list-hallazgo.component.html',
  styleUrls: ['./list-hallazgo.component.scss'],
})
export class ListHallazgoComponent implements OnInit {

  @Input() id_evento:number;
  @Input() hallazgos:any;
  @Output() id_elemento = new EventEmitter<number>();
  @Input() infoEvento:any;
  @Input() usuario:string;
  @Input() plataformaID:number;
  @Input() whoID:number;
  eventos={};
  @Input() whereID:number;

  flagUpload:boolean;
  error:string="";


  constructor(private router:Router,private _imagen:ImagenesService,private _toast:ToastService,public alertController: AlertController,private storage:Storage,private changeRef: ChangeDetectorRef,private applicationRef : ApplicationRef,private _hallazgo:HallazgosService) {
   }

  ngOnInit() {
    this.traerEventos();
  }

  getData(id:number):any {

      this._hallazgo.get_hallazgos(id,this.plataformaID).then((result) => {
        this.hallazgos=  <Array<Object>> result;
        this.changeRef.detectChanges();
        return <Array<Object>> result;
    }, (error) => {
        console.log("ERROR: get data"+JSON.stringify(error));
    }); 
  } 

  @Input() flag() {
  }

  ngOnChanges(changes: SimpleChanges) {
   
    this.getData(this.whoID);
    if (this.infoEvento.area!=null && this.infoEvento.subarea!=null ) {
      this.flagUpload=true;
    }else
    this.flagUpload=false;

   
  }

  obtener_hallazgo(id:string):void{
    this.id_elemento.emit(parseInt(id));
  }

  deleteHallazgo(id:number){
    this._hallazgo.delete_hallazgo(id).then(res=>{
      this._toast.presentToast("Hallazgo borrado con exito",'success')
    });
    this.getData(this.whoID);
  }

  doRefresh(event){
   this.getData(this.whoID);
    event.target.complete();    
  }

  async traerEventos(){
    await this.storage.get('who').then((val) => {
      this.whoID=val;
      this.hallazgos=this.getData(this.whoID);
    });
    await this.storage.get('where').then((val) => {
      this.whereID=val;

    });
      err=>{console.log(err)}
   
  }

  async eventoExistente() {
    const alert = await this.alertController.create({
      header: 'Evento existente',
      subHeader: 'Subtitle',
      message: 'Hay hallazos existentes deseas eliminarlos y volver a empezar',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }

  async uploadHallazgo(hallazgoID){

   this.subir_hallazgo(hallazgoID).then(res=>{
     //console.log("llega aqui");
    this.deleteHallazgo(hallazgoID);
   },
   err=>{
     console.log(JSON.stringify(err))
   })
    
 
  }

async subir_hallazgo(hallazgoID){
  
      return await new Promise(async (resolve, reject) => {
        let scope=this;
      if (!this.flagUpload) {
        this._toast.presentToast("Debes de llenar los datos del evento",'warning');
      }else{
        await this._hallazgo.get_hallazgoLocalByID(hallazgoID).then((res:{ fecha: string,tipo_hallazgoID:number,tipo_implementacionID:number,descripcion:string,observadorID:number,latitude:string,longitude:string})=>{
        this._hallazgo.insert_hallazgoHttp(this.infoEvento.evento,res.fecha,this.infoEvento.area,this.infoEvento.subarea,res.tipo_hallazgoID,res.tipo_implementacionID,res.descripcion,res.observadorID,res.latitude,res.longitude).subscribe((data:{result:any})=>{
                          
                        scope._imagen.get_ImagenesHallazgos(hallazgoID).then((res:{length:any,imagen:any})=>{
                                for(var i=0; i<res.length; i++) {
                                    let base64Img=res[i].imagen.substring(23);
                                    scope.b64resize(res[i].imagen,200).then(async values=>{
                                            let valor=String(values);                               
                                              await scope._imagen.insert_imagenHttp(data[0].response,base64Img,valor.substring(23)).subscribe(res=>{
                                            },
                                            err=>{
                                              this.error="entra a err"+JSON.stringify(err);
                                              reject(JSON.stringify(err))
                                            });
                                      });                                       
                              }
                              resolve(JSON.stringify(res));

                            })
                            this._toast.presentToast("hallazgo guardado","success");
          })
        },
        err=>{
          reject(JSON.stringify(err))
          console.log(JSON.stringify(err));
        })
      
      }
  });
}

  b64resize(URI,maxSize) {
    return new Promise(function(resolve, reject) {
      if (URI == null) return reject();
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image = new Image();
          image.addEventListener('load', function() {
          canvas.width = image.width;
          canvas.height = image.height;
          var canvas2 = document.createElement('canvas');
          var width = image.width;
          var height = image.height;
  
          if (width > height) {
              if (width > maxSize) {
                  height *= maxSize / width;
                  width = maxSize;
              }
          } else {
              if (height > maxSize) {
                  width *= maxSize / height;
                  height = maxSize;
              }
          }
          canvas2.width = width;
          canvas2.height = height;
          canvas2.getContext('2d').drawImage(image, 0, 0, width, height);
          var dataUrl = canvas2.toDataURL('image/jpeg');
          resolve(dataUrl)

      }, false);
      image.src = URI;
    });
  
  }
  

  irDetalle(hallazgoID){
    console.log("entra aqui "+this.whereID)
    this.router.navigate(['/hallazgo-complete',{"usuario":this.usuario,"plataformaID":this.plataformaID,"whereID":this.whereID, "whoID":this.whoID}]);
  }
}
