import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TechnologyKindsComponent } from './technology-kinds.component';
import { TechnologyKindEditComponent } from './technology-kind-edit/technology-kind-edit.component';
import { TechnologyKindListComponent } from './technology-kind-list/technology-kind-list.component';
import { TechnologyKindsRoutingModule } from './technology-kind-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TechnologyKindsComponent,
    TechnologyKindEditComponent,
    TechnologyKindListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TechnologyKindsRoutingModule,
    SharedModule
  ]
})
export class TechnologyKindsModule {}
