import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentTimePipe'
})
export class commentTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const splited=value.split('/')
    const result=splited[2]+" "+splited[1]+" "+splited[0]
    return result;
  }

}
