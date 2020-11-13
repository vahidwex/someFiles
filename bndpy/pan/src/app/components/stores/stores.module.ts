import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresListComponent } from './stores-list/stores-list.component';
import { StoresEditComponent } from './stores-edit/stores-edit.component';
import { StoresService } from 'src/app/services/stores.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StoresDetailComponent } from './stores-detail/stores-detail.component';
import { ProductDetailsKindService } from 'src/app/services/productDetailsKind.service';

@NgModule({
  declarations: [StoresListComponent, StoresEditComponent,StoresDetailComponent],
  imports: [
    CommonModule,
    StoresRoutingModule,
    ReactiveFormsModule
  ],
  providers:[StoresService,ProductDetailsKindService]
})
export class StoresModule { }
