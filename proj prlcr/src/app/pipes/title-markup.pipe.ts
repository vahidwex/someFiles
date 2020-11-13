import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'titleMarkup' })
export class TitleMarkupPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) return '';
        return `<span><span class="title-badge">` + value[0] +
            `</span>` + value.substr(1, value.length) + '</span>';
    }
}
