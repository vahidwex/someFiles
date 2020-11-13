import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresDetailComponent } from './stores-detail/stores-detail.component';
import { StoresEditComponent } from './stores-edit/stores-edit.component';
import { StoresListComponent } from './stores-list/stores-list.component';

const storesRoute: Routes = [
  { path: '', component: StoresListComponent },
  { path: 'new', component: StoresEditComponent },
  { path: ':id', component: StoresDetailComponent },
  { path: ':id/edit', component: StoresEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(storesRoute)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
