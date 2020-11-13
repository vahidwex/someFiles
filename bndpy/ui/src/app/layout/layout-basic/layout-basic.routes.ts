import { Routes } from '@angular/router';

export const BASIC_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../page/error/error.module')
            .then(mod => mod.ErrorModule)
    }
];