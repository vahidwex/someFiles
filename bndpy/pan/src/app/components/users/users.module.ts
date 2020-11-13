import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoleEditComponent } from './user-role-list/user-role-edit/user-role-edit.component';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserEditComponent,
    UserListComponent,
    UserRoleEditComponent,
    UserRoleListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule {}
