import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductKindRoutingModule } from './product-kind-routing.module';
import { ProductKindListComponent } from './product-kind-list/product-kind-list.component';
import { ProductKindNewComponent } from './product-kind-new/product-kind-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductKindListComponent, ProductKindNewComponent],
  imports: [
    CommonModule,
    ProductKindRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
})
export class ProductKindModule { }
