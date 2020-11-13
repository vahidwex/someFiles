import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesByProductsComponent } from './partial/features-by-products/features-by-products.component';


const routes: Routes = [
  {path:"",component:FeaturesByProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
