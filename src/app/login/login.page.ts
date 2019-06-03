import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UsuarioService}  from '../shared/usuario.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  username:string;
  validacion=true;



constructor(public navCtrl: NavController,
            private storage: Storage,
            private alertCtrl: AlertController,
            private _usuario:UsuarioService,
            private router:Router
             ) {

}
ngOnInit() {

}
ionViewDidEnter() {
  this.lookForSession();

}
model={
  usuario:'',
  password:''
}

async lookForSession(){

await this.storage.get('who').then((val) => {
  if(val!=null)
  this.router.navigate(['/hallazgos']);
})
}

logForm(form:NgForm){
  
      this._usuario.log_in(form.value.usuario,form.value.password).subscribe(data=>{
        let user=data['Usuario']
       
                  this.storage.set('who', user[0].usuarioID);
                 this.storage.set('where', user[0].empresaID);   
                 this.storage.set('usuario', user[0].usuario);
                  this.router.navigate(['/hallazgos',{who: user.usuarioID,where: user.empresaID,usuario:user.usuario}]);
   
      },
      err=>{
        alert(JSON.stringify(err))
      })
    }
}