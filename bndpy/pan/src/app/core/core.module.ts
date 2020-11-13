import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../services/auth.service';
import { BannerService } from '../services/banner.service';
import { CapabilityKindService } from '../services/capability-kind.service';
import { CapabilityService } from '../services/capability.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { RoleService } from '../services/role.service';
import { SettingService } from '../services/setting.service';
import { SolutionKindService } from '../services/solution-kind.service';
import { SolutionService } from '../services/solution.service';
import { TechnologyKindService } from '../services/technology-kind.service';
import { TechnologyService } from '../services/technology.service';
import { UserService } from '../services/user.service';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { FeatureKindService } from '../services/feature-kind.service';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    BannerService,
    CapabilityKindService,
    CapabilityService,
    CustomerService,
    ProductService,
    RoleService,
    SettingService,
    SolutionKindService,
    SolutionService,
    TechnologyKindService,
    TechnologyService,
    UserService,
    AuthService,
    FeatureKindService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}

  ]
})
export class CoreModule { }
