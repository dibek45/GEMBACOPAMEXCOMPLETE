import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }


  post_area(area:string,usuarioID:number,empresaID:number) {
          const endPoint=`http://10.11.1.8:81/api/area`;
          return this.http.post(endPoint,{"area":area,"usuarioID": usuarioID,"empresaID":empresaID})
  }


  putAreaAdmi(areaID : number, area: string) {return this.http.put(`http://10.11.1.8:81/api/area/`,{ 'areaID' : areaID, 'area' : area});
  }


  deleteAreaAdmi(areaID:number) {
    return this.http.delete(`http://10.11.1.8:81/api/area/${areaID}`);
  }


}
