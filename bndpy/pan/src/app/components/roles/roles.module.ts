import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleAccessesListComponent } from './role-accesses-list/role-accesses-list.component';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RolesComponent,
    RoleEditComponent,
    RoleListComponent,
    RoleListComponent,
    RoleEditComponent,
    RoleAccessesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RolesRoutingModule,
    SharedModule
  ]
})
export class RolesModule {}
