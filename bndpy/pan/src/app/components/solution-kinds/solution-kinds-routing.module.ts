import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionKindsComponent } from './solution-kinds.component';
import { SolutionKindEditComponent } from './solution-kind-edit/solution-kind-edit.component';
import { SolutionKindListComponent } from './solution-kind-list/solution-kind-list.component';

// import { AuthGuard } from '../auth/auth-guard.service';


const solutionKindsRoutes: Routes = [
  {
    path: '', component: SolutionKindsComponent, children: [
      { path: '', component: SolutionKindListComponent },
      { path: 'new', component: SolutionKindEditComponent }, // , canActivate: [AuthGuard] },
      { path: ':id/edit', component: SolutionKindEditComponent }// , canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(solutionKindsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    // AuthGuard
  ]
})
export class SolutionKindsRoutingModule { }
