import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannersComponent } from './banners.component';
import { BannerEditComponent } from './banner-edit/banner-edit.component';
import { BannerListComponent } from './banner-list/banner-list.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const bannersRoutes: Routes = [
  {
    path: '', component: BannersComponent, children: [
      { path: '', component: BannerListComponent },
      { path: 'new', component: BannerEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: BannerEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(bannersRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class BannersRoutingModule { }
