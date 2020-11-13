import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PubliclayoutComponent } from './layout/publiclayout/publiclayout.component';
import { HeaderComponent } from './layout/publiclayout/partial/header/header.component';
import { FooterComponent } from './layout/publiclayout/partial/footer/footer.component';
import { NavigationComponent } from './layout/publiclayout/partial/navigation/navigation.component';

import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from '@angular/forms';
import { BottomfooterComponent } from './layout/publiclayout/partial/bottomfooter/bottomfooter.component';


@NgModule({
  declarations: [
    AppComponent,
    PubliclayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    BottomfooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
