import { Component, OnInit, Input } from '@angular/core';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagenesService } from 'src/app/shared/imagenes.service';
import { ToastService } from 'src/app/shared/toast.service';



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
  @Input() id_hallazgo:number;

  constructor(private _hallazgo:HallazgosService,private camera: Camera,private _imagen:ImagenesService, private _toast:ToastService) { 
    this.num_imagen=0;
  }

  ngOnInit() {
    this.getData(this.id_hallazgo);
  }

  getData(id) {
   this.num_imagen=0;
    this._imagen.get_ImagenesHallazgos(id).then(res=>{
      this.imagenes=res;
    //  console.log(JSON.stringify(this.imagenes))
      this.imagenes.forEach(element => {
        this.num_imagen++;
      });
      if (this.num_imagen>1) {
        this._toast.presentToast("El limite son 2 imagenes","warning");
      }
      
    })
  } 
  
  getCurrentData(rowid) {
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
      this.image = `data:image/jpeg;base64,${imageData}`;
      this._imagen.save_imagen_camera(this.image,this.id_hallazgo).then(res=>{
      //  console.log(res),
        err=>{
          console.log(err)
        }
      });
      this.getData(this.id_hallazgo);
    }, (err) => {
      console.log(err)
    });
  }

}
