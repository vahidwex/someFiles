import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeatureKindsComponent } from './feature-kinds.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeatureKindsRoutingModule } from './feature-kinds-routing.module';



@NgModule({
  declarations: [
    FeatureKindsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeatureKindsRoutingModule,
    SharedModule
  ]
})
export class FeatureKindModule {}
