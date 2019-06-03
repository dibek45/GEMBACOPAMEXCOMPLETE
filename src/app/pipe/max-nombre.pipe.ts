import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxNombre'
})
export class MaxNombrePipe implements PipeTransform {

  transform(value: any): string {
    return value.substr(0,20)+'..';
  }

}
