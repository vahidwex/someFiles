import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapabilityKindsComponent } from './capability-kinds.component';
import { CapabilityKindListComponent } from './capability-kind-list/capability-kind-list.component';
import { CapabilityKindEditComponent } from './capability-kind-edit/capability-kind-edit.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const CapabilityKindsRoutes: Routes = [
  {
    path: '', component:CapabilityKindsComponent, children: [
      { path: '', component: CapabilityKindListComponent },
      { path: 'new', component: CapabilityKindEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: CapabilityKindEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(CapabilityKindsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class CapabilityKindRoutingModule { }
