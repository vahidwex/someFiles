import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolutionsRoutingModule } from './solutions-routing.module';
import { SolutionKindComponent } from './partial/solution-kind/solution-kind.component';
import { SelectedSolutionKindComponent } from './partial/selected-solution-kind/selected-solution-kind.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [SolutionKindComponent, SelectedSolutionKindComponent],
  imports: [
    CommonModule,
    SolutionsRoutingModule,
    MatButtonModule,
  ]
})
export class SolutionsModule { }
