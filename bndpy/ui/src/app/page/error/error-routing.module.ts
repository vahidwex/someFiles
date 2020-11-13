import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorIndexComponent } from './error-index/error-index.component';


const routes: Routes = [
  {
    path: '**',
    component: ErrorIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
