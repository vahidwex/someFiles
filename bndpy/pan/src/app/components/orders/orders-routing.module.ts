import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { PrintClientsComponent } from './print-clients/print-clients.component';
import { UpdateOrderComponent } from './update-order/update-order.component';

const orderRoutes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: OrdersListComponent
      },
      { path: ':id', component: UpdateOrderComponent },
      { path: 'printClient/:ids', component: PrintClientsComponent }

      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
