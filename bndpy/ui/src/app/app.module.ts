import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PubliclayoutComponent } from './layout/publiclayout/publiclayout.component';
import { HeaderComponent } from './layout/publiclayout/partial/header/header.component';
import { FooterComponent } from './layout/publiclayout/partial/footer/footer.component';
import { NavigationComponent } from './layout/publiclayout/partial/navigation/navigation.component';
import { AppInterceptorService } from './shared/services/interceptor/app-interceptor.service';


import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BottomfooterComponent } from './layout/publiclayout/partial/bottomfooter/bottomfooter.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutBasicComponent } from './layout/layout-basic/layout-basic.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoginComponent } from './layout/publiclayout/partial/login/login.component';
import { CommonModule } from '@angular/common';  
@NgModule({
  declarations: [
    AppComponent,
    PubliclayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    BottomfooterComponent,
    LayoutBasicComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
