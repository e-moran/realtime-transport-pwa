import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stopOperator'
})
export class StopOperatorPipe implements PipeTransform {

  transform(operator: boolean): any {
    if(operator) {
      return 'Dublin Bus/Go-Ahead';
    } else {
      return 'Bus Éireann';
    }
  }
}
