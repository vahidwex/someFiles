import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';


@NgModule({
  declarations: [FourZeroFourComponent],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule { }
