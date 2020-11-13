import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnologiesComponent } from './technologies.component';
import { TechnologyEditComponent } from './technology-edit/technology-edit.component';
import { TechnologyListComponent } from './technology-list/technology-list.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const technologiesRoutes: Routes = [
  {
    path: '', component: TechnologiesComponent, children: [
      { path: '', component: TechnologyListComponent },
      { path: 'new', component: TechnologyEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: TechnologyEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(technologiesRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class TechnologiesRoutingModule { }
