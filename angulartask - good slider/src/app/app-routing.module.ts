import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PubliclayoutComponent } from './layout/publiclayout/publiclayout.component';
import { PUBLIC_ROUTES } from './layout/publiclayout/publiclayout.routes';


const routes: Routes = [
  {path:"",component:PubliclayoutComponent,children:PUBLIC_ROUTES},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
