import { Routes } from '@angular/router';

export const BASIC_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../../pages/errors/errors.module')
            .then(mod => mod.ErrorsModule)
    }
];