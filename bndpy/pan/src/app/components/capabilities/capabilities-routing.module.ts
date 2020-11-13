import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapabilitiesComponent } from './capabilities.component';
import { CapabilityEditComponent } from './capability-edit/capability-edit.component';
import { CapabilityListComponent } from './capability-list/capability-list.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const CapabilitiesRoutes: Routes = [
  {
    path: '', component: CapabilitiesComponent, children: [
      { path: '', component: CapabilityListComponent },
      { path: 'new', component: CapabilityEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: CapabilityEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(CapabilitiesRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class CapabilitiesRoutingModule { }
