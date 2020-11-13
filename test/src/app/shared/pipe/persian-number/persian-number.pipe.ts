import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber'
})
export class PersianNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let result;
    let arr = value.toString().split("");
    let persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    result = arr.map((i) => {
      let char = "";
      if (persianNumbers[i]) {
        result = persianNumbers[i];
      } else {
        result = i;
      }

      return result;
    });
    result = result.join("");

    return result;
  }

}
