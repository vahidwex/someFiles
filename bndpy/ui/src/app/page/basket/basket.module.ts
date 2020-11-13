import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketPageComponent } from './basket-page/basket-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BasketPageComponent],
  imports: [
    CommonModule,
    BasketRoutingModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ]
})
export class BasketModule { }
