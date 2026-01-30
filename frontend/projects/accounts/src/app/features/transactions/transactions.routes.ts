import { Routes } from '@angular/router';
import { TransactionListComponent } from './pages/list-transactions/list-transactions.component';
import { TransactionAddComponent } from './pages/add-transactions/add-transactions.component';

export const TRANSACTIONS_FEATURE_ROUTES: Routes = [
        {
            path: '',
            component: TransactionListComponent,
        },
        {
            path: 'add',
            component: TransactionAddComponent
        },
        {
            path: 'edit/:id',
            component: TransactionAddComponent
        }
];