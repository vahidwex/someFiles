import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationalResoursesRoutingModule } from './educational-resourses-routing.module';
import { EducationalResourcesComponent } from './educational-resources/educational-resources.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { EducationalResourcesNewComponent } from './educational-resources-new/educational-resources-new.component';

@NgModule({
  declarations: [EducationalResourcesComponent, ProductListComponent, EducationalResourcesNewComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    EducationalResoursesRoutingModule
  ]
})
export class EducationalResoursesModule { }
