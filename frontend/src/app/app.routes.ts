import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';
import { authGuard } from './core/auth/auth.guard';
import { NotFound } from './shared/pages/not-found/not-found';
import { loadRemoteModule } from '@angular-architects/module-federation';
export const routes: Routes = [
    {
    path: 'login',
    loadChildren: () =>
    import('./features/auth/auth.routes')
    .then(m => m.AUTH_ROUTES),
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivateChild: [authGuard],
        children: [

            {
            path: 'accounts',
            loadChildren: () =>
            loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4300/remoteEntry.js',
            exposedModule: './Routes',
            }).then(m => m.ACCOUNTS_ROUTES),
            },
            {
                path: 'author',
                loadChildren: () =>
                    import('./features/author/author.routes')
                        .then(m => m.AUTHOR_ROUTES),
            },
            {
                path: 'book',
                loadChildren: () =>
                    import('./features/book/book.routes')
                        .then(m => m.BOOK_ROUTES),
            },
            {
                path: 'user',
                loadChildren: () =>
                    import('./features/user/user.routes')
                        .then(m => m.USER_ROUTES),
            },
            {
                path: 'todo',
                loadChildren: () =>
                    import('./features/todo/todo.routes')
                        .then(m => m.TODO_ROUTES),
            },
            {
                path: '',
                loadChildren: () =>
                    import('./features/dashboard/dashboard.routes')
                        .then(m => m.DASHBOARD_ROUTES),
            },
            {
                path: 'signals',
                loadChildren: () =>
                    import('./features/signals/signals.route')
                        .then(m => m.SIGNALS_ROUTES),
            },
            {
                path: '**',
                component: NotFound,
            },
        ]
    }
];
