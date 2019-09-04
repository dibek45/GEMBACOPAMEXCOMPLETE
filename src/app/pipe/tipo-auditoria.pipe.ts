import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoAuditoria'
})
export class TipoAuditoriaPipe implements PipeTransform {

  transform(value: any): string {
    if (value==1) {
      value="Auditoria 5s"
    }else
    value="Auditoria 3s"
    return value;
  }

}
