import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './core/login/login.component';
import { AccessGuard } from './shared/guards/access-guard.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent, children: [
      { 
        path: 'banners', 
        loadChildren: './components/banners/banners.module#BannersModule',
        canActivate:[AccessGuard],
        data:{roles:"getBanners"}
      },
      { 
        path: 'capabilities', 
        loadChildren: './components/capabilities/capabilities.module#CapabilitiesModule',
        canActivate:[AccessGuard],
        data:{roles:"getCapability"}
      },
      { 
        path: 'capabilitykinds', 
        loadChildren: './components/capability-kinds/capability-kind.module#CapabilityKindsModule',
        canActivate:[AccessGuard],
        data:{roles:"getCapabilityKind"}
      },
      { 
        path: 'customers', 
        loadChildren: './components/customers/customers.module#CustomersModule',
        canActivate:[AccessGuard],
        data:{roles:"getCustomers"}
      },
      { 
        path: 'products', 
        loadChildren: './components/products/products.module#ProductsModule',
        canActivate:[AccessGuard],
        data:{roles:"getProducts"}
      },
      { 
        path: 'productKind', 
        loadChildren: './components/product-kind/product-kind.module#ProductKindModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getproductKinds"}
      },
      
      { 
        path: 'roles', 
        loadChildren: './components/roles/roles.module#RolesModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getRoles"}
      },
      { 
        path: 'setting', 
        loadChildren: './components/setting/setting.module#SettingModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getSetting"}
      },
      { 
        path: 'solutionkinds', 
        loadChildren: './components/solution-kinds/solution-kinds.module#SolutionKindsModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getSolutionKinds"}
      },
      { 
        path: 'solutions', 
        loadChildren: './components/solutions/solutions.module#SolutionsModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getSolution"}
      },
      { 
        path: 'technologykinds', 
        loadChildren: './components/technology-kinds/technology-kind.module#TechnologyKindsModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getTechnologyKinds"}
      },
      { 
        path: 'technologies', 
        loadChildren: './components/technologies/technologies.module#TechnologiesModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getTechnology"}
      },
      { 
        path: 'users', 
        loadChildren: './components/users/users.module#UsersModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getUsers"}
      },
      { 
        path: 'featureKinds', 
        loadChildren: './components/feature-kinds/feature-kinds.module#FeatureKindModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getFeatureDetailsFromProduct"}
      },
      { 
        path: 'educationalSources', 
        loadChildren: './components/educational-resourses/educational-resourses.module#EducationalResoursesModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getEducationalSourcesFromProduct"}
      },
      { 
        path: 'order', 
        loadChildren: './components/orders/orders.module#OrdersModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getAllOrder"}
      },
      { 
        path: 'transport', 
        loadChildren: './components/transport/transport.module#TransportModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getAlltransport"}
      }
      ,
      { 
        path: 'product-details', 
        loadChildren: './components/product-details/product-details.module#ProductDetailsModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getproductDetails"}
      }
      ,
      { 
        path: 'product-details-kind', 
        loadChildren: './components/product-details-kind/product-details-kind.module#ProductDetailsKindModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getproductDetailsKinds"}
      },
      { 
        path: 'stores', 
        loadChildren: './components/stores/stores.module#StoresModule' ,
        canActivate:[AccessGuard],
        data:{roles:"getproductDetailsKinds"}
      }
      
    ]
    // , canActivate: [AuthGuard]
  },
  { path: '**', component: PageNotFoundComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules,initialNavigation: 'enabled',useHash: true })
  ],
  exports: [RouterModule]

})


export class AppRoutingModule {

}
