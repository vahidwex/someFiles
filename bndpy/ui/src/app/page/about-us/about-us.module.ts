import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './partial/about-us/about-us.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    CarouselModule,
  ]
})
export class AboutUsModule { }
