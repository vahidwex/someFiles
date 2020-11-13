import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PubliclayoutComponent } from './layout/publiclayout/publiclayout.component';
import { PUBLIC_ROUTES } from './layout/publiclayout/publiclayout.routes';
import { LayoutBasicComponent } from './layout/layout-basic/layout-basic.component';
import { BASIC_ROUTES } from './layout/layout-basic/layout-basic.routes';



const routes: Routes = [
  {
    path:"",
    component:PubliclayoutComponent,
    children:PUBLIC_ROUTES
  }
  ,
  {
    path: '',
    component:LayoutBasicComponent,
    children: BASIC_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, 
    {initialNavigation: 'enabled',useHash: true}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
