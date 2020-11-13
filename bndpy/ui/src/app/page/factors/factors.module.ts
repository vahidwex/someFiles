import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactorsRoutingModule } from './factors-routing.module';
import { PreviewFactorComponent } from './preview-factor/preview-factor.component';
import { ReceiptFactorComponent } from './receipt-factor/receipt-factor.component';
import { TransportationComponent } from './transportation/transportation.component';
import { SelectPaymentComponent } from './select-payment/select-payment.component';
import { MatButtonModule } from '@angular/material/button';
import { inputCustomize } from '../../shared/pipe/customInput.pipe';



@NgModule({
  declarations: [inputCustomize,PreviewFactorComponent, ReceiptFactorComponent, TransportationComponent, SelectPaymentComponent],
  imports: [
    CommonModule,
    FactorsRoutingModule,
    MatButtonModule,
    
  ]
})
export class FactorsModule { }
