import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { SettingEditComponent } from './setting-edit/setting-edit.component';
import { SettingListComponent } from './setting-list/setting-list.component';

//import { AuthGuard } from '../auth/auth-guard.service';


const settingsRoutes: Routes = [
  {
    path: '', component: SettingComponent, children: [
      { path: '', component: SettingEditComponent } //, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(settingsRoutes)
  ],
  exports: [RouterModule],
  providers: [
    //AuthGuard
  ]
})
export class SettingRoutingModule { }
