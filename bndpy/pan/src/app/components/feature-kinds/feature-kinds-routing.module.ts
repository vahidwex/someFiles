import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureKindsComponent } from './feature-kinds.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const featureKindsRoutes: Routes = [
  {
    path: '', component: FeatureKindsComponent
  } 
];

@NgModule({
  imports: [
    RouterModule.forChild(featureKindsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class FeatureKindsRoutingModule { }
