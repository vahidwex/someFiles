import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DndDirective } from '../../directive/dnd.directive';




@NgModule({
  declarations: [DndDirective],
  exports:[DndDirective],
  imports: [
    CommonModule
  ]
})
export class SharedDirectiveModule { }
