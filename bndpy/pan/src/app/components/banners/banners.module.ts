import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BannersComponent } from './banners.component';
import { BannerEditComponent } from './banner-edit/banner-edit.component';
import { BannerListComponent } from './banner-list/banner-list.component';
import { BannersRoutingModule } from './banners-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    BannersComponent,
    BannerEditComponent,
    BannerListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BannersRoutingModule,
    SharedModule
  ]
})
export class BannersModule {}
