import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesByProductsComponent } from './partial/features-by-products/features-by-products.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [FeaturesByProductsComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    MatButtonModule,
  ]
})
export class FeaturesModule { }
