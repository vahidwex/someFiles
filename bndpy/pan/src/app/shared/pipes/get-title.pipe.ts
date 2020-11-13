import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTitle', pure: false
})
export class GetTitlePipe implements PipeTransform {

  transform(value: any, array: any[]): any {
    if (array) {

      return array.find(obj => obj._id === value).title;
    }
  }


}
