import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsKindEditComponent } from './product-details-kind-edit/product-details-kind-edit.component';
import { ProductDetailsKindListComponent } from './product-details-kind-list/product-details-kind-list.component';

const Productroutes: Routes = [
  { path: '', component: ProductDetailsKindListComponent },
  { path: 'new', component: ProductDetailsKindEditComponent },
  { path: ':id/edit', component: ProductDetailsKindEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(Productroutes)],
  exports: [RouterModule]
})
export class ProductDetailsKindRoutingModule { }
