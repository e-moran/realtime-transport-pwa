import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueTime'
})
export class DueTimePipe implements PipeTransform {

  transform(value: number): string {
    if(value == 1) {
      return 'Due in ' + value + ' min';
    }

    if(value != null) {
      return 'Due in ' + value + ' mins';
    }

    return 'Due Now';
  }

}
