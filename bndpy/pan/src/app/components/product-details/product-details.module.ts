import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsListComponent } from './product-details-list/product-details-list.component';
import { ProductDetailsEditComponent } from './product-details-edit/product-details-edit.component';
import { ProductDetailsService } from 'src/app/services/productDetails.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsKindService } from 'src/app/services/productDetailsKind.service';

@NgModule({
  declarations: [ProductDetailsListComponent, ProductDetailsEditComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ProductDetailsRoutingModule
  ],
  providers: [ProductDetailsService,ProductDetailsKindService],
})
export class ProductDetailsModule { }
