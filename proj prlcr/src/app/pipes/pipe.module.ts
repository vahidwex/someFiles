import { NgModule } from "@angular/core";
import { CommonModule }   from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router"

// Components
import { PriceFormatPipe } from "./price-format.pipe";
import { PrepareKeywordPipe } from "./prepareKeyword.pipe";
import { SafePipe } from "./safe-pipe.module";
import {TitleMarkupPipe} from "./title-markup.pipe";
import { CountryFormatPipe } from "./country-format.module";

@NgModule({
    declarations: [
        PriceFormatPipe,
        PrepareKeywordPipe,
        SafePipe,
        TitleMarkupPipe,
        CountryFormatPipe
    ],
    exports: [
        PriceFormatPipe,
        PrepareKeywordPipe,
        SafePipe,
        TitleMarkupPipe,
        CountryFormatPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
    ],
    providers: [],
})

export class PipeModule {}
