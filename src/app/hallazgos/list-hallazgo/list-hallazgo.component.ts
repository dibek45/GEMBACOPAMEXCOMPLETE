import { Component, OnInit, Input, Output, EventEmitter, ApplicationRef, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
import { Storage } from '@ionic/storage';
import { PopoverController, AlertController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/shared/toast.service';
import { ImagenesService } from 'src/app/shared/imagenes.service';
import { Router } from '@angular/router';
import { EditarComponentModal } from 'src/app/modals/editar/editar.component2';
import { LoadingService } from 'src/app/shared/loading.service';
import { EditarComponent } from '../hallazgo-detalle/editar/editar.component';
import { AddInfoHallazgoComponent } from '../add-info-hallazgo/add-info-hallazgo.component';


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
  @Output() infoArea= new EventEmitter<boolean>();
  @Input() whereID:number;
  flagUpload:boolean;
  error:string="";
  arreglo={tipoID:0,descripcion:"", implementacionID:0,idEvento:0};
  conexion: boolean;


  constructor(public popoverController: PopoverController,private _loading:LoadingService, private  modalController: ModalController,private  router:Router,private _imagen:ImagenesService,private _toast:ToastService,public alertController: AlertController,private storage:Storage,private changeRef: ChangeDetectorRef,private applicationRef : ApplicationRef,private _hallazgo:HallazgosService) {
    this.infoArea.emit(false)
  }


  getData(id:number):any {
      this._hallazgo.get_hallazgos(id,this.plataformaID).then((result) => {
 //   alert(JSON.stringify(this.hallazgos))
        this.hallazgos= result;
    }, (error) => {
        console.log("ERROR: get data"+JSON.stringify(error));
    });
  }

  getDataX(): any {
      this._hallazgo.get_hallazgos(this.whoID,this.plataformaID).then((result) => {
      //  alert(JSON.stringify(this.hallazgos))
        this.hallazgos= result;
       // this._toast.presentToast('Imagen guadada','success','bottom')
    }, (error) => {
        console.log("ERROR: get data"+JSON.stringify(error));
    });
  }

  @Input() flag() {
  }

  ngOnInit() {
    this.getDataX()
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.infoEvento==undefined) {
    }else{
      if(this.infoEvento.area!=null && this.infoEvento.subarea!=null ) {
        this.flagUpload=true;
      }else
        this.flagUpload=false;
    }
  }

  obtener_hallazgo(id:string):void{
    this.id_elemento.emit(parseInt(id));
  }

  deleteHallazgo(id:number){
    this._hallazgo.delete_hallazgo(id).then(res=>{
      this.getDataX();
    //  this.confirmarActualizar('Hallazgo eliminado');
    },
    err=>{
      alert(JSON.stringify(err))
    });
  }

  doRefresh(event){
   this.getData(this.whoID);
    event.target.complete();
  }

  async traerEventos() {
    await this.storage.get('who').then((val) => {
      this.whoID=val;
      this.hallazgos=this.getData(this.whoID);
    });
    await this.storage.get('where').then((val) => {
      this.whereID=val;

    });
    err=>{console.log('Error 88'+err)}

  }


  async confirmarActualizar(mensaje) {
    const alert = await this.alertController.create({
      header: mensaje,
      message: ' <strong>Pulsa el boton para continuar</strong>!!!',
      buttons: [
       {
          text: 'Continuar',
          handler: () => {
            this.getDataX();
          }
        }
      ]
    });

    await alert.present();
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



async subir_hallazgo(hallazgoID) {
  return await new Promise(async (resolve, reject) => {
        let scope=this;
        if (!this.flagUpload) {
        this._toast.presentToast('Debes de llenar los datos del evento', 'warning', 'bottom');
      } else {
        this._loading.presentLoading("Subiendo",3500);
        await this._hallazgo.get_hallazgoLocalByID(hallazgoID).then((res:{ fecha: string,tipo_hallazgoID:number,tipo_implementacionID:number,descripcion:string,observadorID:number,latitude:string,longitude:string})=>{
        this._hallazgo.insert_hallazgoHttp(this.infoEvento.evento,res.fecha,this.infoEvento.area,this.infoEvento.subarea,res.tipo_hallazgoID,res.tipo_implementacionID,res.descripcion,res.observadorID,res.latitude,res.longitude).subscribe(async (data:{result:any})=>{

                  await scope._imagen.get_ImagenesHallazgos(hallazgoID).then((res:{length:any,imagen:any})=>{
                                for(var i=0; i<res.length; i++) {
                                    let base64Img=res[i].imagen.substring(23);
                                    scope.b64resize(res[i].imagen,200).then(async values=>{
                                            let valor=String(values);
                                              await scope._imagen.insert_imagenHttp(data[0].response,base64Img,valor.substring(23)).subscribe(res=>{
                                                this.deleteHallazgo(hallazgoID);
                                                // alert(JSON.stringify('Hallazgo enviado a servidor'))
                                                this._toast.presentToast("hallazgo guardado","success",'bottom');
                                              },
                                            err=>{
                                              this.error="entra a err"+JSON.stringify(err);
                                              this._toast.presentToast("Error al subir","warning",'bottom');
                                              console.log(JSON.stringify(err));
                                            });
                                      });
                              }
                        resolve("bien");
                      })
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

  async openModal(hallazgoID:number) {
    const modal = await this.modalController.create({
      component: EditarComponentModal,
      componentProps: {
        "hallazgoID":hallazgoID
      }
    });



    modal.onDidDismiss().then((dataReturned) => {
      this.getDataX();
      if (dataReturned !== null) {
         //alert(dataReturned.data);
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
    return await modal.present();
  }

  async uploadHallazgo(hallazgoID){

    this._hallazgo.pingHttp('').then(res => {
      this.infoArea.emit(true);
      this.subir_hallazgo(hallazgoID).then( res => {
     console.log('llega aqui');
       },
      err => {
      alert('Error en subir hallazgo' + JSON.stringify(err))
       });
  }, err => {
    alert(JSON.stringify(err) + 'Hay red cpx verfica conexion (error 400)');
  });
   if (this.conexion==false) {
     this.hacerPing();
   }else{

   }


  }




  async presentAlertPromptDescription() {
    this._hallazgo.alert_descripcion().then(res=>{
      let result:string;
      result=JSON.stringify(res);
      this.arreglo.descripcion=result;
      this.alertTipoRadio();

    })

  }
  async alertTipoRadio() {
   this._hallazgo.alert_radio().then(res=>{
     this.arreglo.tipoID=parseInt(JSON.stringify(res));
     this.alertTipoImplementacion();
   })
  }

  async alertTipoImplementacion() {
    await this._hallazgo.alert_tipo_implementacion().then(res=>{
    this.arreglo.implementacionID=parseInt(JSON.stringify(res));
    this.arreglo.idEvento=this.id_evento;
    })
    await this.nuevo_hallazgo();
  }

   async nuevo_hallazgo(){
      await this._hallazgo.postHallazgos(this.arreglo,this.whoID,null,null,this.plataformaID).then(res=>{
          this._toast.presentToast("Hallazgo agregado",'success','bottom');
          this.getDataX()
        });
   }


   hacerPing(){
    this.conexion=null;

     setTimeout(() => {
       if (this.conexion==null){
         this._toast.presentToastOpions('','Verifique su coneccion a red CPX','md-information-circle').then(res=>{
           this.hacerPing();
         })
         this.conexion=false;
         return this.conexion;
     }},1000);
 }

}
