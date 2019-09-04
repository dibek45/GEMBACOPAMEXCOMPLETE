import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagenModalPage } from '../imagen-modal/imagen-modal.page';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagenesService } from '../shared/imagenes.service';
import { Storage } from '@ionic/storage';
import { HallazgosService } from '../shared/hallazgos.service';
import { Hallazgo } from '../shared/hallazgo.model';
import { ToastService } from '../shared/toast.service';
import { DiseñoService } from '../shared/diseño.service';
import { LoadingService } from '../shared/loading.service';

@Component({
  selector: 'app-hallazgo-complete',
  templateUrl: './hallazgo-complete.page.html',
  styleUrls: ['./hallazgo-complete.page.scss'],
})
export class HallazgoCompletePage implements OnInit {
  noImages:boolean;
  evidenciasAfter;
  evidenciasBefore;
  sliderOpts = {
  zoom: true,
  slidesPerView: 1.5,
  spaceBetween: 0,
  centeredSlides: true,
  rotate: 50,
  stretch: 0,
  depth: 100,
  modifier: 1,
  pager:true,
  slideShadows: true};
  hallazgoID: number;
  usuario: string;
  hallazgo:Hallazgo;
  avanceID:Number;
  comentario: String;
  plataformaID: number;
  whereID: number;
  whoID: number;
  color: string;
  permiso: number;

  constructor(private _loading:LoadingService, private _diseño:DiseñoService,private _toast:ToastService,private _hallazgo:HallazgosService,
    private storage: Storage,private _image :ImagenesService,private router:Router, private route: ActivatedRoute,
    private modalController: ModalController) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.hallazgoID = +params['hallazgoID']; 
        this.whereID = +params['whereID'];
        this.whoID = +params['whoID'];
        this.usuario = params['usuario'];
        this.plataformaID = +params['plataformaID']; 
        this.permiso = +params['permiso']; 
        this._diseño.getColorMenu(this.plataformaID).then(res => {
        this.color = JSON.stringify(res);
        })
        this.getImageBefore(this.hallazgoID);
        this.getImageAfter(this.hallazgoID);
        this._hallazgo.getHallazgoByID_api(this.hallazgoID).subscribe(res => {
        this.hallazgo = res[0];
        this.avanceID = this.hallazgo.avanceID;
        this.comentario = this.hallazgo.comentario;
        },
        err => {
          console.log(JSON.stringify(err));
        });
   });
  }

  ngOnChanges(){
   
  }

  openPreview(img) {

    this.modalController.create({
      component: ImagenModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }


  getImageBefore(hallazgoID){
    this._image.getImagesApi(hallazgoID,0).subscribe(res=>{
    this.evidenciasBefore=res['evidencias'];    
    })
  }

  async getImageAfter(hallazgoID){
    await this._image.getImagesApi(hallazgoID,1).subscribe(res=>{
      this.evidenciasAfter=res['evidencias'];   
      if (this.evidenciasAfter.length && this.evidenciasAfter) {
        this.noImages=false;
      }else{
        this.noImages=true;
      }
      
     

    //  console.log(JSON.stringify(this.evidenciasAfter));
      this.evidenciasAfter=res['evidencias']; 
    })
    
  }


  getPicture(type:number){
    let scope=this;
    this._image.getImageFileCamara(type).then(res=>{
      let base64Img=String(res).substring(23);
      scope.b64resize(String(res),200).then(async values=>{
        let valor=String(values); 
        this._image.insert_imagenHttpAfter(this.hallazgoID,base64Img,String(valor).substring(23)).subscribe(
          (res)=>{
           scope.getImageAfter(this.hallazgoID);
           if (this.comentario!='') {
            this._hallazgo.putStateHallazgoHttp(this.hallazgo.hallazgoID,3).subscribe(res=>{
              this.avanceID=3;
              this._toast.presentToast("Estatus actualizado ",'success','bottom');
            },
             err=>{
               console.log(JSON.stringify(err));
             });
           }else {
            this._hallazgo.putStateHallazgoHttp(this.hallazgo.hallazgoID,2).subscribe(res=>{
              this.avanceID=2;
              this._toast.presentToast("Estatus actualizado ",'success','bottom');
            },
             err=>{
               console.log(JSON.stringify(err));
             });
           }
          },
          (err)=>{
            console.log(JSON.stringify(err));
          })
      });
    },
    err=>{
      console.log(JSON.stringify(err));

    })
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

  updateComentario(event){
    this.comentario=event;
    if (this.comentario!='') {
      if (this.hallazgo.avanceID<=3) {
        if (this.noImages) {
          this._hallazgo.putComentarioHallazgoHttp(this.hallazgo.hallazgoID,event).subscribe(res=>{
            this._hallazgo.putStateHallazgoHttp(this.hallazgo.hallazgoID,2).subscribe(res=>{
              this.avanceID=2;
              this._toast.presentToast("Estatus actualizado ",'success','bottom');
             },
             err=>{
               console.log(JSON.stringify(err));
             })
           },
           err=>{
             console.log(JSON.stringify(err))
           })
        
        }else{

          this._hallazgo.putComentarioHallazgoHttp(this.hallazgo.hallazgoID,event).subscribe(res=>{
           // console.log(JSON.stringify(res))
            this._hallazgo.putStateHallazgoHttp(this.hallazgo.hallazgoID,3).subscribe(res=>{
        //      console.log(JSON.stringify(res));
        this._toast.presentToast("Estatus actualizado ",'success','bottom');
             this.avanceID=3;
            
             },
             err=>{
               console.log(JSON.stringify(err));
             });
           },
           err=>{
             console.log(JSON.stringify(err));
           });
         
         

        }
    }
    }else 
    this._toast.presentToast("Escribe un comentario",'warning','bottom');

   
  }

  back(){
         this.router.navigate(['/principal',{"usuario":this.usuario,"plataformaID":this.plataformaID,"whereID":this.whereID, "whoID":this.whoID,"permiso":this.permiso}]);
  }
  

  go(menu){
    if (menu=='salir') {
    this.storage.set('who', null);
    this.storage.set('where', null);
    this.router.navigate(['/login',]);
    }else
    this.router.navigate([`/${menu}`,{"whoID":this.whoID,"usuario":this.usuario,"plataformaID":this.plataformaID,"whereID":this.whereID,"permiso":this.permiso}]);
  }


  recargarPage(event){
    this.avanceID = event;
    this._toast.presentToast("Estatus actualizado ",'success','bottom');
  }
}
