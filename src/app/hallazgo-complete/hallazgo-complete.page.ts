import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagenModalPage } from '../imagen-modal/imagen-modal.page';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagenesService } from '../shared/imagenes.service';
import { Storage } from '@ionic/storage';
import { HallazgosService } from '../shared/hallazgos.service';
import { Hallazgo } from '../shared/hallazgo.model';

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
  usuario: number;
  hallazgo:Hallazgo;
  avanceID:Number;

  constructor(private _hallazgo:HallazgosService,private storage: Storage,private _image :ImagenesService,private router:Router, private route: ActivatedRoute,private modalController: ModalController) { }

  ngOnInit() {
      this.cargar_usuario();
      this.route.params.subscribe(params => {
      this.hallazgoID = +params['hallazgoID']; 
      this.getImageBefore(this.hallazgoID);
      this.getImageAfter(this.hallazgoID);
      this._hallazgo.getHallazgoByID_api(this.hallazgoID).subscribe(res=>{
      this.hallazgo=res[0];
      this.avanceID=this.hallazgo.avanceID;
      alert(JSON.stringify(this.hallazgo))
      },
      err=>{
        alert(JSON.stringify(err))
      })
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
      if (this.evidenciasAfter==null) {
        this.noImages=true;
      }else
      this.noImages=false;
      this.evidenciasAfter=res['evidencias']; 
    })
    
  }

  cargar_usuario() {
    this.storage.get('usuario').then((val) => {
      this.usuario=val;
    });
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

          },
          (err)=>{
            alert(JSON.stringify(err))
          }
        )
      });
         
      
    },
    err=>{
      alert(JSON.stringify(err))

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
}
