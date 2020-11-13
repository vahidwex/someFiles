import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoersonalDataComponent } from './poersonal-data/poersonal-data.component';


const routes: Routes = [
  {path:"",component:PoersonalDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalDataRoutingModule { }
