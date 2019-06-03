import { Injectable } from '@angular/core';
import {environment}  from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  
  log_in(usuario:string,password:string) {

   // let endPoint= `${environment.apiBaseUrl}:81/login/${usuario}/`+encodeURIComponent(password);
   let endPoint= `${environment.apiBaseUrl}usuario/${usuario}/`+encodeURIComponent(password);
    return this.http.get(endPoint,{});
   }
}
