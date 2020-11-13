import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersianNumberPipe } from '../../pipe/persian-number/persian-number.pipe';
import { PrePipe } from '../../pipe/pre/pre.pipe';




@NgModule({
  declarations: [
    PersianNumberPipe,
    PrePipe
  ],
  exports: [
    PersianNumberPipe,
    PrePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedPipeModule { }
