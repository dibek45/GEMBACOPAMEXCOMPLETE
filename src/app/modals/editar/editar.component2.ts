import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { HallazgosService } from 'src/app/shared/hallazgos.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-editarModal',
  templateUrl: './editar.component2.html',
  styleUrls: ['./editar.component2.scss'],
})
export class EditarComponentModal implements OnInit {
  todo:any= {}
  hallazgoID:number;
  descripcion:any;
 
  constructor(private _toast:ToastService,private modalCtrl:ModalController,private router:Router,public navCtrl: NavController,private _hallazgo:HallazgosService, private formBuilder: FormBuilder,public navParams: NavParams) {
    this.hallazgoID=this.navParams.get('hallazgoID');
    this.todo = this.formBuilder.group({
      descripcion:['',Validators.required],
      tipo:['',Validators.required],
      tipo_accion:['',Validators.required]
    });
   }

  ngOnInit() {}

  update(){
        if (this.todo.value.descripcion==''||this.todo.value.tipo_accion==''||this.todo.value.tipo=='') {
          this._toast.presentToast('Tiene que llenar todos los datos','danger','bottom');

        }else{
              this._hallazgo.editHallazgo(this.todo.value.descripcion,
                                          this.todo.value.tipo_accion,
                                          this.todo.value.tipo,
                                          this.hallazgoID
                                          ).then(res=>{
                this._toast.presentToast('Actualizado','success','bottom');
                this.modalCtrl.dismiss();    
              },
              err=>{
                alert(JSON.stringify(err));
              }
              )
        }
  }

  cancel(){
    this.modalCtrl.dismiss();  
  }
}
