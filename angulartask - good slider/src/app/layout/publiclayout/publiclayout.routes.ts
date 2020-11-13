import { Routes } from '@angular/router';

export const PUBLIC_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../page/home/home.module')
            .then(mod => mod.HomeModule)
    },
    {
        path: 'home',
        loadChildren: () => import('../../page/home/home.module')
            .then(mod => mod.HomeModule)
    },
    {
        path: 'product/:id',
        loadChildren: () => import('../../page/product/product.module')
            .then(mod => mod.ProductModule)
    }
]