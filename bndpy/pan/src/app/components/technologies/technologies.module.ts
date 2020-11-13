import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TechnologiesComponent } from './technologies.component';
import { TechnologyEditComponent } from './technology-edit/technology-edit.component';
import { TechnologyListComponent } from './technology-list/technology-list.component';
import { TechnologiesRoutingModule } from './technologies-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    TechnologiesComponent,
    TechnologyEditComponent,
    TechnologyListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TechnologiesRoutingModule,
    SharedModule
  ]
})
export class TechnologiesModule {}
