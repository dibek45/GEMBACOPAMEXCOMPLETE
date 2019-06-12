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
  loading:boolean;



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

await this.storage.get('who').then(async (who) => {
  if(who!=null)
  await this.storage.get('usuario').then(async (usuario) => {
    if(usuario!=null)
    await this.storage.get('where').then((where) => {
      if(where!=null)
      this.router.navigate(['/plataforma/',{"whoID": who,"whereID": where,"usuario":usuario}]);
    })
  })
})
}

logForm(form:NgForm){
      this._usuario.log_in(form.value.usuario,form.value.password).subscribe(data=>{
        let user=data['Usuario'];
                this.storage.set('who', user[0].usuarioID);
                this.storage.set('where', user[0].empresaID);   
                this.storage.set('usuario', user[0].usuario);
                this.router.navigate(['/plataforma/',{"whoID": user[0].usuarioID,"whereID": user[0].empresaID,"usuario":user[0].usuario}]);
      },
      err=>{
        console.log(JSON.stringify(err))
      })
    }
}