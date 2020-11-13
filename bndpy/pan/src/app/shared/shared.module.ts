import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './directives/dropdown.directive';
import { GetTitlePipe } from './pipes/get-title.pipe';
import { AuthGuard } from '../services/auth-guard.service';

@NgModule({
  declarations: [
    DropdownDirective,
    GetTitlePipe
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    GetTitlePipe
  ],
  providers: [
    AuthGuard
  ]
})
export class SharedModule {}
