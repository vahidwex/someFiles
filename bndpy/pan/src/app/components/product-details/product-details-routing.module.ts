import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsEditComponent } from './product-details-edit/product-details-edit.component';
import { ProductDetailsListComponent } from './product-details-list/product-details-list.component';

const Productroutes: Routes = [
  { path: '', component: ProductDetailsListComponent },
  { path: 'new', component: ProductDetailsEditComponent },
  { path: ':id/edit', component: ProductDetailsEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(Productroutes)],
  exports: [RouterModule]
})
export class ProductDetailsRoutingModule { }
