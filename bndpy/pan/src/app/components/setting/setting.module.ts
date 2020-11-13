import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingEditComponent } from './setting-edit/setting-edit.component';
import { SettingListComponent } from './setting-list/setting-list.component';
import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingAddressComponent } from './setting-address/setting-address.component';
import { SettingSocialNetworkComponent } from './setting-social-network/setting-social-network.component'


@NgModule({
  declarations: [
    SettingComponent,
    SettingEditComponent,
    SettingListComponent,
    SettingAddressComponent,
    SettingSocialNetworkComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingRoutingModule,
    SharedModule
  ]
})
export class SettingModule {}
