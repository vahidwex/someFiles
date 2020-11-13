import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductKindListComponent } from './product-kind-list/product-kind-list.component';
import { ProductKindNewComponent } from './product-kind-new/product-kind-new.component';

const ProductKindroutes: Routes = [
      { path: '', component: ProductKindListComponent },
      { path: 'new', component: ProductKindNewComponent },
      { path: ':id', component: ProductKindNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ProductKindroutes)],
  exports: [RouterModule]
})
export class ProductKindRoutingModule { }
