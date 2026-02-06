import { Routes } from '@angular/router';

export const STRATEGY_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'goals',
                loadChildren: () =>
                    import('./features/goals/goals.routes')
                        .then(m => m.GOALS_FEATURE_ROUTES),
            },
            {
                path: '',
                redirectTo: 'goals',
                pathMatch: 'full'
            }
        ],
    },
];
