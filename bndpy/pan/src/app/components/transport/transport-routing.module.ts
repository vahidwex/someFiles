import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransportEditComponent } from './transport-edit/transport-edit.component';
import { TransportComponent } from './transport/transport.component';

const transportRoutes: Routes = [
  {
    path: '', children: [
      { path: '', component: TransportComponent },
      { path: 'new', component: TransportEditComponent },//, canActivate: [AuthGuard] },
      { path: ':id/edit', component: TransportEditComponent }//, canActivate: [AuthGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(transportRoutes)],
  exports: [RouterModule]
})
export class TransportRoutingModule { }
