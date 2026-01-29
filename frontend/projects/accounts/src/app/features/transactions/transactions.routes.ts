import { Routes } from '@angular/router';
import { TransactionListComponent } from './pages/list-transactions/list-transactions.component';

export const TRANSACTIONS_FEATURE_ROUTES: Routes = [
        {
            path: '',
            component: TransactionListComponent,
        },
        // {
        //     path: 'add',
        //     component: AddTransactionComponent
        // }
];