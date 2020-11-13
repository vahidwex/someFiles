import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductTechnologyComponent } from './product-technology/product-technology.component';
import { ProductBannerComponent } from './product-banner/product-banner.component';
import { ProductAdvantageComponent } from './product-advantage/product-advantage.component';
import { ProductEducationalSourceComponent } from './product-educational-source/product-educational-source.component';
import { ProductFeatureComponent } from './product-feature/product-feature.component';
import { ProductDetailsService } from 'src/app/services/productDetails.service';
import { RevisionComponent } from './revision/revision.component';





@NgModule({
  declarations: [
    ProductsComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductTechnologyComponent,
    ProductBannerComponent,
    ProductAdvantageComponent,
    ProductEducationalSourceComponent,
    ProductFeatureComponent,
    RevisionComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedModule,
  ],
  providers:[
    ProductDetailsService
  ]
})
export class ProductsModule {}
