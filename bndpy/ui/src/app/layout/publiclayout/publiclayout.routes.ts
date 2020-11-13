import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../page/home/home.module')
            .then(mod => mod.HomeModule)
    },
    
    {
        path: 'factor',
        loadChildren: () => import('../../page/factors/factors.module')
            .then(mod => mod.FactorsModule)
    },
    {
        path: 'personalData',
        loadChildren: () => import('../../page/personal-data/personal-data.module')
            .then(mod => mod.PersonalDataModule)
    },
    {
        path: 'home',
        loadChildren: () => import('../../page/home/home.module')
            .then(mod => mod.HomeModule)
    },
    {
        path: 'basket',
        loadChildren: () => import('../../page/basket/basket.module')
            .then(mod => mod.BasketModule)
    },
    {
        path: 'product/:name',
        loadChildren: () => import('../../page/product/product.module')
            .then(mod => mod.ProductModule)
    },
    {
        path: 'products',
        loadChildren: () => import('../../page/products/products.module')
            .then(mod => mod.ProductsModule)
    },
    {
        path: 'products/:id',
        loadChildren: () => import('../../page/products/products.module')
            .then(mod => mod.ProductsModule)
    }
    
    ,
    {
        path: 'aboutUs',
        loadChildren: () => import('../../page/about-us/about-us.module')
            .then(mod => mod.AboutUsModule)
    }
    // ,
    // {
    //     path: 'features/:name',
    //     loadChildren: () => import('../../page/features/features.module')
    //         .then(mod => mod.FeaturesModule)
    // },
    // {
    //     path: 'solution/:name',
    //     loadChildren: () => import('../../page/solution/solution.module')
    //         .then(mod => mod.SolutionModule)
    // }
    // ,
    // {
    //     path: 'solutions',
    //     loadChildren: () => import('../../page/solutions/solutions.module')
    //         .then(mod => mod.SolutionsModule)
    // }
]