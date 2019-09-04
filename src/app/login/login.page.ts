import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UsuarioService}  from '../shared/usuario.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingService } from '../shared/loading.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../shared/toast.service';
import { HallazgosService } from '../shared/hallazgos.service';
// RxJS v6+
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})

export class LoginPage {
  username:string;
  validacion=true;
  loading:boolean;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  error: string;
  conexion: any;
 
  constructor(
    private _hallazgo:HallazgosService,
    private _toast:ToastService,
    public alertController: AlertController,
    private _loading:LoadingService,
    public navCtrl: NavController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private _usuario:UsuarioService,
    private router:Router,
    private http:HttpClient,
     ) {

}
ngOnInit() {

}

  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

async ionViewDidEnter() {
  this.hacerPing(); 
  this.lookForSession();
}
model={
  usuario:'',
  password:''
}

async lookForSession(){
  this._loading.presentLoading('Cargando',2000);
  await this.storage.get('who').then(async (who) => {
    if(who!=null){
        await this.storage.get('usuario').then(async (usuario) => {
          if(usuario!=null)
          await this.storage.get('where').then((where) => {
            if(where!=null)
            this.router.navigate(['/plataforma/',{"whoID": who,"whereID": where,"usuario":usuario}]);
            })
          })
      }
    })
}

hacerPing(){
   this.conexion=null;
    this._hallazgo.pingHttp('').then(res=>{
        if (this.conexion==null) {
         this.conexion=true;
         this._toast.presentToast('Conectado a red CPX','success','bottom');
         this.error='';
            return this.conexion;
        }
    });
}

async logForm(form:NgForm){
  this._loading.presentLoading('Cargando', 2000);
  
  let usuario=form.value.usuario;
  let password=form.value.password;
  this.loading=true;
   let endPoint= `http://10.11.1.8:81/api/usuario/${usuario}/`+encodeURIComponent(password);

   this.http.get(endPoint).subscribe((data:{Usuario:{usuarioID:number}})=>
   {
    this.loading=false;
      if(data.Usuario[0].usuarioID!=null){
              let user=data['Usuario'];
              this.storage.set('who', user[0].usuarioID);
              this.storage.set('where', user[0].empresaID);   
              this.storage.set('usuario', user[0].usuario);
              this.router.navigate(['/plataforma/',{"whoID": user[0].usuarioID,"whereID": user[0].empresaID,"usuario":user[0].usuario}]);
            }else
          this._toast.presentToast('Usuario y/ Contraseña incorrecta','warning','bottom')},
   err=>{
    this.loading=false;
     this.error="Verifique su conexion a internet";
     console.log(JSON.stringify(err));
   });

  
}



async cambiar_pass() {
  const alert = await this.alertController.create({
    header: 'Cambiar contraseña!',
    inputs: [
      {
        name: 'usuario',
        value: '',
        type: 'text',
        placeholder: 'Antigua contraseña'
      },
      {
        name: 'password1',
        value: '',
        type: 'password',
        placeholder: 'Antigua contraseña'
      }, {
        name: 'password2',
        type: 'text',
        placeholder: 'Nueva contraseña'
      },
      {
        name: 'password3',
        type: 'password',
        id: 'name2-id',
        value: '',
        placeholder: 'Repetir contraseña'
      }
     
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Cambiar',
        handler: (data) => {
          if (data.usuario==null||data.password1==null||data.password2==null||data.password3==null) {
            this._toast.presentToast('Debe ingresar todos los campos','warning','bottom')
          }else
          this._usuario.updateData(data).subscribe(data=>{ 
            let respuesta:string =data.toString();           
            if(respuesta==="Contraseña actualizada con exito")
            this._toast.presentToast(''+data,'success','bottom');

            this._toast.presentToast(''+data,'secondary','bottom');

          },err=>{
             console.log("err"+JSON.stringify(err));   
            })
        }
      }
    ]
  });

  await alert.present();
}

}