import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductTechnologyComponent } from './product-technology/product-technology.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const productsRoutes: Routes = [
  {
    path: '', component: ProductsComponent, children: [
      {
        path: '', component: ProductListComponent
      },
      {
        path: 'new', component: ProductEditComponent
      },
      { path: ':id', component: ProductDetailComponent },
      { path: ':id/edit', component: ProductEditComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class ProductsRoutingModule { }
