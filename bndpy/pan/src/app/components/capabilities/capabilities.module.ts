import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CapabilitiesComponent } from './capabilities.component';



import { CapabilityEditComponent } from './capability-edit/capability-edit.component';
import { CapabilityListComponent } from './capability-list/capability-list.component';
import { CapabilitiesRoutingModule } from './capabilities-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CapabilitiesComponent,
    CapabilityEditComponent,
    CapabilityListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CapabilitiesRoutingModule,
    SharedModule
  ]
})
export class CapabilitiesModule {}
