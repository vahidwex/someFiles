import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SolutionKindsComponent } from './solution-kinds.component';
import { SolutionKindEditComponent } from './solution-kind-edit/solution-kind-edit.component';
import { SolutionKindListComponent } from './solution-kind-list/solution-kind-list.component';
import { SolutionKindsRoutingModule } from './solution-kinds-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SolutionKindsComponent,
    SolutionKindEditComponent,
    SolutionKindListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolutionKindsRoutingModule,
    SharedModule
  ]
})
export class SolutionKindsModule {}
