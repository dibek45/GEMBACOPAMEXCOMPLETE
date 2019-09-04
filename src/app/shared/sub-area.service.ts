import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubAreaService {

  constructor(private http: HttpClient) { }

    post_subArea(subArea:string,areaID:number) {
      const endPoint=`http://10.11.1.8:81/api/subArea`;
      return this.http.post(endPoint,{"subArea":subArea,"areaID": areaID})
  }


  putSubAreaAdmi(subAreaID : number, subArea: string) {return this.http.put(`http://10.11.1.8:81/api/subArea/`,{ 'subAreaID' : subAreaID, 'subArea' : subArea});
  }


  deleteSubAreaAdmi(subAreaID:number) {
    return this.http.delete(`http://10.11.1.8:81/api/subArea/${subAreaID}`);
  }

}
