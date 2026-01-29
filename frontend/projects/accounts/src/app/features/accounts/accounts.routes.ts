import { Routes } from '@angular/router';
import { ListAccountsComponent } from './pages/list-accounts/list-accounts.component';
import { AddAccountsComponent } from './pages/add-accounts/add-accounts.component';
export const ACCOUNTS_FEATURE_ROUTES: Routes = [
    {
        path: '',
        component: ListAccountsComponent
    },
    {
        path: 'add',
        component: AddAccountsComponent
    }
];
