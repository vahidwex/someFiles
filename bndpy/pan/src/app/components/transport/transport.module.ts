import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransportRoutingModule } from './transport-routing.module';
import { TransportComponent } from './transport/transport.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransportService } from 'src/app/services/transport.service';
import { TransportEditComponent } from './transport-edit/transport-edit.component';

@NgModule({
  declarations: [TransportComponent,TransportEditComponent ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    ReactiveFormsModule,
  ],providers:[
    TransportService
  ]
})
export class TransportModule { }
