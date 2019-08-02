import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagenesService } from 'src/app/shared/imagenes.service';
import { ToastService } from 'src/app/shared/toast.service';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-hallazgo-detalle',
  templateUrl: './hallazgo-detalle.component.html',
  styleUrls: ['./hallazgo-detalle.component.scss'],
})
export class HallazgoDetalleComponent implements OnInit {

  image: string = null;
  image_mini: string = null;
  eventos:string[];
  subArea:string[];
  data = { rowid:0, imagen:"",fecha:""};
  imagenes: any = [];
  balance = 0;
  num_imagen:number;
  @Output() banderaEdit = new EventEmitter<boolean>();
  @Input() id_hallazgo:number;
  imagenJson: any;
  selectedImage: any;
  banderaEditlocal: boolean;

  constructor(private _loading:LoadingService, private _hallazgo:HallazgosService,private camera: Camera,private _imagen:ImagenesService, private _toast:ToastService) { 
    this.num_imagen=0;
    this.banderaEditlocal=true;
  }

  ngOnInit(){
    this.getData();
  }

  getData() {
   this.num_imagen=0;
    this._imagen.get_ImagenesHallazgos(this.id_hallazgo).then(res=>{
      this.imagenes=res;
      this.imagenes.forEach(element => {
        this.num_imagen++;
      });
      if (this.num_imagen>1) {
        this._toast.presentToast("El limite son 2 imagenes","warning",'bottom');
      }
    })
  } 
  
  
  getCurrentData(item) {
    this.image=item.imagen;
    this.selectedImage=item.rowid;
    this.banderaEditlocal=true;
    this.banderaEdit.emit(true);
  }

  getPicture(type:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:type,
    }

    this.camera.getPicture(options).then((imageData) => {
    //  this.image = `data:image/jpeg;base64,${imageData}`;
      let img = `data:image/jpeg;base64,${imageData}`;
      this._imagen.save_imagen_camera(img,this.id_hallazgo).then(res=>{
      
        err=>{
          console.log(err);
        }
      });
      this.getData();
    }, (err) => {
      console.log(err);
    });
  }


  saveCanvasData(event){
    this._imagen.update_imagen_camera(event,this.selectedImage).then(res=>{
      this.getData();
      this.selectedImage=null;
      this.banderaEdit.emit(false);
      this._toast.presentToast('Actualizada','warning','bottom');
      },
      err=>{
        console.log(err);
      });
  }

  deleteImage(item){
    this._imagen.delete_imagen(item.rowid).then(res=>{
    this._toast.presentToast(JSON.stringify(res),'warning','bottom');
    this.getData();
      },
      err=>{
        alert(JSON.stringify(err));
      })
  }
}
