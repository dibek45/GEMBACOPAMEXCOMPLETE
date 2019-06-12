import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiseñoService {

  constructor() { }


  getColorMenu(plataformaID){
    return new Promise((resolve,reject)=>{
      switch (plataformaID) {
        case 1:resolve('tertiary');
          break;
        case 2:resolve('secondary');
          break;
        case 3:resolve('primary');
          break;
        case 4:resolve('danger');
          break;
        default:
          break;
      }
    })
  }
}
