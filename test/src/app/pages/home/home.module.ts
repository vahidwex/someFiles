import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedDirectiveModule } from '../../shared/module/shared-directive/shared-directive.module';
import { SharedPipeModule } from '../../shared/module/shared-pipe/shared-pipe.module';
import { ProgressComponent } from '../../shared/component/progress/progress.component';



@NgModule({
  declarations: [HomeComponent,ProgressComponent],
  imports: [
    SharedDirectiveModule,
    SharedPipeModule,
    CommonModule,
    HomeRoutingModule
    
  ]
})
export class HomeModule { }
