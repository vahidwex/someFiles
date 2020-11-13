import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationalResourcesComponent } from './educational-resources/educational-resources.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EducationalResourcesNewComponent } from './educational-resources-new/educational-resources-new.component';

const routes: Routes = [
  { path: '', component: EducationalResourcesComponent ,children: [
    { path: '', component: EducationalResourcesNewComponent }
    
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationalResoursesRoutingModule { }
