import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { UpdateOrderComponent } from './update-order/update-order.component';
import { OrderService } from 'src/app/services/order.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PrintClientsComponent } from './print-clients/print-clients.component';

@NgModule({
  declarations: [OrdersListComponent, UpdateOrderComponent, PrintClientsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule
  ],providers:[
    OrderService
  ]
})
export class OrdersModule { }
