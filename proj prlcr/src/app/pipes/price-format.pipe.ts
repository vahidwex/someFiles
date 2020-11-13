import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'priceformat' })
export class PriceFormatPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}