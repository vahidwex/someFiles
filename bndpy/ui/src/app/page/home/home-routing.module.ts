import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeindexComponent } from './homeindex/homeindex.component';


const routes: Routes = [
  {
    path: '',
    component: HomeindexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
