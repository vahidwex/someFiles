import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerProductsComponent } from './customer-products/customer-products.component';



@NgModule({
  declarations: [
    CustomersComponent,
    CustomerEditComponent,
    CustomerListComponent,
    CustomerProductsComponent,
    CustomerProductsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule {}
