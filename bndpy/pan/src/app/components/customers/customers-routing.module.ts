import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerProductsComponent } from './customer-products/customer-products.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const customersRoutes: Routes = [
  {
    path: '', component: CustomersComponent, children: [
      { path: '', component: CustomerListComponent, children:[{path:':id/products',component:CustomerProductsComponent}] },
      { path: 'new', component: CustomerEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: CustomerEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(customersRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class CustomersRoutingModule { }
