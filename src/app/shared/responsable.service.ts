import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment}  from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private http:HttpClient) { }

  getResponsables(empresaID: number) {
    //  let endPoint= `${environment.apiBaseUrl}:81/login/${usuario}/`+encodeURIComponent(password);
    let endPoint= `http://10.11.1.8:81/api/responsable/${empresaID}`
    return this.http.get(endPoint,{});
     }
  getResponsableAll(empresaID: number) {
      //  let endPoint= `${environment.apiBaseUrl}:81/login/${usuario}/`+encodeURIComponent(password);
     let endPoint= `http://10.11.1.8:81/api/responsableAll/${empresaID}`
      return this.http.get(endPoint,{});
  }


}
