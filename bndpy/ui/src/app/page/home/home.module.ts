import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeindexComponent } from './homeindex/homeindex.component';
import { SliderComponent } from './homeindex/partial/slider/slider.component';
import { VisionComponent } from './homeindex/partial/vision/vision.component';
import { BestproductsComponent } from './homeindex/partial/bestproducts/bestproducts.component';
import { TrendproductComponent } from './homeindex/partial/trendproduct/trendproduct.component';
import { TrendingproductComponent } from './homeindex/partial/trendingproduct/trendingproduct.component';
import { BlogsComponent } from './homeindex/partial/blogs/blogs.component';
import { LinksComponent } from './homeindex/partial/links/links.component';
import { InstagramComponent } from './homeindex/partial/instagram/instagram.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [HomeindexComponent, SliderComponent, VisionComponent, BestproductsComponent, TrendproductComponent, TrendingproductComponent, BlogsComponent, LinksComponent, InstagramComponent],
  imports: [
    MatTooltipModule,
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    MatButtonModule,
  ]
})
export class HomeModule { }
