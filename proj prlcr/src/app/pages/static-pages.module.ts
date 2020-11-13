import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { PipeModule } from '../pipes/pipe.module';
import { PublicDirectivesModule } from "../public-directives/public-directives.module";

// Components
import { HowItWorksComponent } from "./how-it-works/how-it-works.component";
import { CategoryPageComponent } from "./category-page/category-page.component";
import { FreelancerPublicProfileComponent } from "./freelancer-public-profile/freelancer-public-profile.component";
import { PostJobComponent } from "./post-job/post-job.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AboutComponent } from "./about/about.component";
import { TermsComponent } from "./terms/terms.component";
import { PageNotFoundComponent } from "./static-pages/page-not-found.component";
import { NetworkErrorComponent } from "./static-pages/network-error.component";
import { FreelancerComponent } from "./freelancer-landing/freelancer.component";

// Services
import { PostRoleGuardService } from "../rolegaurd/post-role-guard.service";
import { TokenGuardEmployerService } from "../tokengaurd/token-gaurd-employer.service";
import { LocalJobsComponent } from './localjobs/local-jobs.component';


@NgModule({
    declarations: [
        HowItWorksComponent,
        CategoryPageComponent,
        FreelancerPublicProfileComponent,
        PostJobComponent,
        ForgotPasswordComponent,
        AboutComponent,
        TermsComponent,
        NetworkErrorComponent,
        PageNotFoundComponent,
        FreelancerComponent
    ],
    exports: [],
    imports: [
        RouterModule.forChild([
            {
                path: 'how-it-works',
                component: HowItWorksComponent
            },
            {
                path: 'welcome/freelancer',
                component: FreelancerComponent
            },
            {
                path: 'FAQ',
                component: HowItWorksComponent,
            },
            {
                path: 'how-it-works/freelancer',
                component: HowItWorksComponent,
            },
            {
                path: 'how-it-works/employer',
                component: HowItWorksComponent,
            },
            {
                path: 'categories',
                component: CategoryPageComponent
            },
            {
                path: 'profile/:user_id',
                component: FreelancerPublicProfileComponent
            },
            {
                path: 'local-jobs',
                component: LocalJobsComponent,
            },
            {
                path: 'profile/:user_id/:name',
                component: FreelancerPublicProfileComponent
            },
            {
                canActivate: [PostRoleGuardService],
                path: 'post-job',
                component: PostJobComponent
            },
            {
                canActivate: [TokenGuardEmployerService],
                path: 'post-job/:project_id',
                component: PostJobComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            },
            {
                path: 'about',
                component: AboutComponent,
            },
            {
                path: 'terms',
                component: TermsComponent,
            },
            {
                path: '404',
                component: PageNotFoundComponent,
            },
            {
                path: '500',
                component: NetworkErrorComponent,
            },
        ]),
        CommonModule,
        PipeModule,
        PublicDirectivesModule
    ],
})

export class StaticPagesModule {}
