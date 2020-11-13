import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolutionsComponent } from './solutions.component';
import { SolutionEditComponent } from './solution-edit/solution-edit.component';
import { SolutionListComponent } from './solution-list/solution-list.component';
import { SolutionsRoutingModule } from './solutions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SolutionProductListComponent } from './solution-product-list/solution-product-list.component';



@NgModule({
  declarations: [
    SolutionsComponent,
    SolutionEditComponent,
    SolutionListComponent,
    SolutionProductListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolutionsRoutingModule,
    SharedModule
  ]
})
export class SolutionsModule {}
