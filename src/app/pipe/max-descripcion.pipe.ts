import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxDescripcion'
})
export class MaxDescripcionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
           return value.substr(0,40)+'..';
  }

}
