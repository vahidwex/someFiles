import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsKindRoutingModule } from './product-details-kind-routing.module';
import { ProductDetailsKindListComponent } from './product-details-kind-list/product-details-kind-list.component';
import { ProductDetailsKindEditComponent } from './product-details-kind-edit/product-details-kind-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsKindService } from 'src/app/services/productDetailsKind.service';

@NgModule({
  declarations: [ProductDetailsKindListComponent, ProductDetailsKindEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductDetailsKindRoutingModule
  ],
  providers: [ProductDetailsKindService],
})
export class ProductDetailsKindModule { }
