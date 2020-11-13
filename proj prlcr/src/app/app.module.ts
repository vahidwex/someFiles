import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { OwlModule } from 'ngx-owl-carousel';
import { LoadingBarModule } from '@ngx-loading-bar/core';

// Modules
import { PublicDirectivesModule } from "./public-directives/public-directives.module";
import { AppRoutingModule } from './app-routing.module';
import { PipeModule } from './pipes/pipe.module';

// Component
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { PublicSampleViewDialog } from './pages/freelancer-public-profile/freelancer-public-profile.component';
import { SearchFreelancerComponent } from './pages/search-freelancer/search-freelancer.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { BidDialog } from "./public-directives/bid-dialog/bid-dialog";
import { BuyBidDialog } from "./public-directives/buy-bid-dialog/buy-bid-dialog";

// Service
import { HttpServiceInterceptor } from './interceptor/http-service.interceptor';
import { ApiService } from './Services/Api.Service';
import { MetaService } from './tools/meta.service';
import { BlockUiService } from './tools/blockui-service';
import { AuthService } from './tools/auth-service';
import { LinkService } from './tools/link.service';
import { HelperFunction } from './tools/helper-function';
import { TokenGuardService } from './tokengaurd/token-gaurd.service';
import { TokenGuardEmployerService } from './tokengaurd/token-gaurd-employer.service';
import { PusherService } from './tools/pusher.service';
import { PostRoleGuardService } from './rolegaurd/post-role-guard.service';
import { AlertService } from './tools/alert.service';
import { TokenService } from './Services/token.service';
import { BaseService } from './Services/base.service';
import { MessageService } from "./Services/message.service";

// Static Files
import { Api } from './Services/Api';
import {UploadService} from "./Services/upload.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SearchPageComponent,
        LoginComponent,
        RegisterComponent,
        PublicSampleViewDialog,
        ProjectsComponent,
        SearchFreelancerComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "torobche-app" }),
        BrowserTransferStateModule,
        // ServiceWorkerModule.register('ngsw-worker.js', { enabled: true }),
        AppRoutingModule,
        PublicDirectivesModule,
        BrowserAnimationsModule,
        NgbModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        NgxJsonLdModule,
        PipeModule,
        OwlModule,
        LoadingBarModule
    ],
    providers: [
        Api,
        BaseService,
        PusherService,
        BlockUiService,
        AlertService,
        TokenService,
        HelperFunction,
        MetaService,
        ApiService,
        UploadService,
        AuthService,
        LinkService,
        TokenGuardService,
        TokenGuardEmployerService,
        PostRoleGuardService,
        MessageService,
        {
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: HttpServiceInterceptor
        }
    ],
    entryComponents: [
        BidDialog,
        BuyBidDialog,
        PublicSampleViewDialog,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
