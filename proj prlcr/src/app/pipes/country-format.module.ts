import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StaticData } from "../Services/static-data";

@Pipe({ name: 'countryFormat' })
export class CountryFormatPipe implements PipeTransform {
    public countries = StaticData.COUNTRIES;

    transform(value: string, args: string[]): any {
        if (!value) return '';
        for(let i = 0; i < this.countries.length; i++){
            if(this.countries[i].code.includes(value)){
                return this.countries[i].name;
            }
        }
        return '';
    }
}