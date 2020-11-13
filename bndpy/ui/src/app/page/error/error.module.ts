import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorIndexComponent } from './error-index/error-index.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [ErrorIndexComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
