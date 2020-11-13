import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'preparekeyword' })
export class PrepareKeywordPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        return value.toString().replace(/_/g, " ");
    }
}
