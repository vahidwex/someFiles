import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleAccessesListComponent } from './role-accesses-list/role-accesses-list.component';

// import { AuthGuard } from '../auth/auth-guard.service';


const rolesRoutes: Routes = [
  {
    path: '', component: RolesComponent, children: [
      { path: '', component: RoleListComponent, children: [{ path: ':id/accesses', component: RoleAccessesListComponent }] }        ,
      { path: 'new', component: RoleEditComponent }, // , canActivate: [AuthGuard] },      //, canActivate: [AuthGuard] },
      { path: ':id/edit', component: RoleEditComponent }// , canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(rolesRoutes)
  ],
  exports: [RouterModule],
  providers: [
    // AuthGuard
  ]
})
export class RolesRoutingModule { }
