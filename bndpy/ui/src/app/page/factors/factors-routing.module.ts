import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewFactorComponent } from './preview-factor/preview-factor.component';
import { ReceiptFactorComponent } from './receipt-factor/receipt-factor.component';
import { FactorPreviewGuard } from '../../shared/services/guards/factor.guard';





const routes: Routes = [
  
  {path:"",children:[
    
    {path:"preview",component:PreviewFactorComponent,canActivate: [FactorPreviewGuard]},

    {path:"receipt",component:ReceiptFactorComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorsRoutingModule { }
