import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionsComponent } from './solutions.component';
import { SolutionEditComponent } from './solution-edit/solution-edit.component';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionProductListComponent } from './solution-product-list/solution-product-list.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const solutionsRoutes: Routes = [
  {
    path: '', component: SolutionsComponent, children: [
      { path: '', component: SolutionListComponent,children:[{path:':id/products',component:SolutionProductListComponent}] },
      { path: 'new', component: SolutionEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: SolutionEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(solutionsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class SolutionsRoutingModule { }
