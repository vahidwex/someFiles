import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolutionKindComponent } from './partial/solution-kind/solution-kind.component';
import { SelectedSolutionKindComponent } from './partial/selected-solution-kind/selected-solution-kind.component';




const routes: Routes = [
  {path:"",component:SolutionKindComponent},
  {path:":name",component:SelectedSolutionKindComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolutionsRoutingModule { }
