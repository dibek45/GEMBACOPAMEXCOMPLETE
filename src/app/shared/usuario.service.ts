import { Injectable } from '@angular/core';
import {environment}  from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/timeout';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  
  log_in(usuario:string,password:string) {
   // let endPoint= `${environment.apiBaseUrl}:81/login/${usuario}/`+encodeURIComponent(password);
   let endPoint= `http://10.11.1.8:81/api/usuario/${usuario}/`+encodeURIComponent(password);
    return this.http.get(endPoint,{});
   }

  updateData(data) {
    //let endPoint= `${environment.apiBaseUrl}:81/login/${usuario}/`+encodeURIComponent(password);
    let endPoint= `http://10.11.1.8:81/api/usuario/${data.usuario}/`+encodeURIComponent(data.password1)+'/'+encodeURIComponent(data.password2)+'/'+encodeURIComponent(data.password3);
     return this.http.put(endPoint,{});
    }

    getPermisoPlataforma(whoID,plataformaID){


      return new Promise((resolve, reject) => {
        let endPoint= `http://10.11.1.8:81/api/usuarioPermiso/${whoID}/${plataformaID}/`;
        let subscription  = this.http.get(endPoint).timeout(1000).subscribe(res=>{
          resolve(res);
        },err=>{
          reject(err);
        });
          })
   
    }
}
