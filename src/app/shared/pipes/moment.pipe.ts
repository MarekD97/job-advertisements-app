import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    moment.locale('pl');
    return moment(value.toDate()).format('HH:mm, DD MMMM yyyy');
  }

}
