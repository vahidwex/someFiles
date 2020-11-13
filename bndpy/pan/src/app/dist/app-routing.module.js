"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./core/home/home.component");
var page_not_found_component_1 = require("./components/page-not-found/page-not-found.component");
var auth_guard_service_1 = require("./services/auth-guard.service");
var login_component_1 = require("./core/login/login.component");
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    {
        path: '', component: home_component_1.HomeComponent, children: [
            { path: 'banners', loadChildren: './components/banners/banners.module#BannersModule' },
            { path: 'capabilities', loadChildren: './components/capabilities/capabilities.module#CapabilitiesModule' },
            { path: 'capabilitykinds', loadChildren: './components/capability-kinds/capability-kind.module#CapabilityKindsModule' },
            { path: 'customers', loadChildren: './components/customers/customers.module#CustomersModule' },
            { path: 'products', loadChildren: './components/products/products.module#ProductsModule' },
            { path: 'productKind', loadChildren: './components/product-kind/product-kind.module#ProductKindModule' },
            { path: 'roles', loadChildren: './components/roles/roles.module#RolesModule' },
            { path: 'setting', loadChildren: './components/setting/setting.module#SettingModule' },
            { path: 'solutionkinds', loadChildren: './components/solution-kinds/solution-kinds.module#SolutionKindsModule' },
            { path: 'solutions', loadChildren: './components/solutions/solutions.module#SolutionsModule' },
            { path: 'technologykinds', loadChildren: './components/technology-kinds/technology-kind.module#TechnologyKindsModule' },
            { path: 'technologies', loadChildren: './components/technologies/technologies.module#TechnologiesModule' },
            { path: 'users', loadChildren: './components/users/users.module#UsersModule' },
            { path: 'featureKinds', loadChildren: './components/feature-kinds/feature-kinds.module#FeatureKindModule' },
            { path: 'educationalSources', loadChildren: './components/educational-resourses/educational-resourses.module#EducationalResoursesModule' },
        ],
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
