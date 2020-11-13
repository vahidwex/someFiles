import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../pages/home/home.module')
            .then(mod => mod.HomeModule)
    },
    {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module')
            .then(mod => mod.HomeModule)
    },
    {
        path: 'product',
        loadChildren: () => import('../../pages/product/product.module')
            .then(mod => mod.ProductModule)
    },
];