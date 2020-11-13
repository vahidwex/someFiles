import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoleListComponent } from './user-role-list/user-role-list.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      { path: '', component: UserListComponent ,children:[{
        path:':id/roles',component : UserRoleListComponent
      }]},
      { path: 'new', component: UserEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: UserEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class UsersRoutingModule { }
