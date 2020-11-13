import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';

import { CapabilityKindsComponent } from './capability-kinds.component';
import { CapabilityKindListComponent } from './capability-kind-list/capability-kind-list.component';
import { CapabilityKindEditComponent } from './capability-kind-edit/capability-kind-edit.component';
import { CapabilityKindRoutingModule } from './capability-kind-routing.module';



@NgModule({
  declarations: [
    CapabilityKindsComponent,
    CapabilityKindEditComponent,
    CapabilityKindListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CapabilityKindRoutingModule,
    SharedModule
  ]
})
export class CapabilityKindsModule {}
