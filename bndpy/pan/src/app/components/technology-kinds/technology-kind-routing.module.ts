import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnologyKindsComponent } from './technology-kinds.component';
import { TechnologyKindEditComponent } from './technology-kind-edit/technology-kind-edit.component';
import { TechnologyKindListComponent } from './technology-kind-list/technology-kind-list.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const technologyKindsRoutes: Routes = [
  {
    path: '', component: TechnologyKindsComponent, children: [
      { path: '', component: TechnologyKindListComponent },
      { path: 'new', component: TechnologyKindEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: TechnologyKindEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(technologyKindsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class TechnologyKindsRoutingModule { }
