import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchFreelancerComponent } from './pages/search-freelancer/search-freelancer.component';
import { ProjectsComponent } from './pages/projects/projects.component';

// Services
import { TokenGuardService } from "./tokengaurd/token-gaurd.service";
import { PostRoleGuardService } from './rolegaurd/post-role-guard.service';
import { HowItWorksComponent } from './pages/how-it-works/how-it-works.component';

const routes: Routes = [
    {
        canActivate: [PostRoleGuardService],
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'register/:role',
        component: RegisterComponent
    },
    {
        path: 'freelancer/:action/:data',
        component: SearchFreelancerComponent
    },
    {
        path: 'freelancer',
        component: SearchFreelancerComponent
    },
    {
        path: 'search-fl',
        redirectTo: 'freelancer',
        pathMatch: 'full'
    },
    {
        path: 'search/:action/:data',
        component: SearchPageComponent
    },
    {
        path: 'search',
        component: SearchPageComponent
    },
    {
        path: 'projects/:project_id',
        component: ProjectsComponent
    },
    {
        path: 'panel',
        canActivate: [TokenGuardService],
        loadChildren: '../app/panel/panel.module#PanelModule',
    },
    {
        path: '',
        pathMatch: 'prefix',
        loadChildren: '../app/pages/static-pages.module#StaticPagesModule'
    },
    {
        path: '**',
        redirectTo: '404',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
