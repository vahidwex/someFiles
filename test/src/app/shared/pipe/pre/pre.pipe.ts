import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pre'
})
export class PrePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let result = '';
    let valueArray = value.split('');
    valueArray.map((item, index) => {
      if (item.charCodeAt(0) == 10) {
        valueArray[index] = '<br />';
      }
    });
    result = valueArray.join('');
    return result;
  }

}
