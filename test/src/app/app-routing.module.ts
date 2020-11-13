import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PUBLIC_ROUTES } from './layouts/public-layout/public-layout.routes';
import { BASIC_ROUTES } from './layouts/basic-layout/basic-layout.routes';




const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: PUBLIC_ROUTES
  },
  {
    path: '',
    component: BasicLayoutComponent,
    children: BASIC_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
